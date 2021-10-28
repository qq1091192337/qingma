# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
import json
import os
import time
from urllib import parse
from urllib.parse import parse_qs, urlparse, urlencode
import requests
import execjs
from multiprocessing import Pool

js_env = execjs.get()
js_code = ""
f = os.open("md5.js", os.O_RDWR)
js_code = os.read(f, 99999).decode("utf-8")
os.close(f)
session = requests.Session()

def getStudentById(yhzh):
    res = session.get("https://qmzxtest.17el.cn//phoneAction_getStudentById.action?yhzh=%s" % yhzh, verify=False).text
    res = res.replace('null(', "")[0:-1]
    return json.loads(res)['map']


def getAllCourse(site, year, pageIndex, status, xkzt):
    res = session.get(
        "https://qmzxtest.17el.cn//phoneAction_getAllCourse.action?site=%s&year=%s&pageIndex=%s&status=%s&xkzt=%s" % (
            site, year, pageIndex, status, xkzt), verify=False).text
    return json.loads(res)


def getCourseInfo(kcid, yhid):
    res = session.get(
        'https://qmzxtest.17el.cn//phoneAction_getCourseInfo.action?kcid=%s&yhid=%s&isAddDjl=undefined' % (kcid, yhid),
        verify=False).text
    return json.loads(res)['map']


courses = getAllCourse(125, -1, 1, 0, 2)['map']['courseList']
Student = getStudentById("41162720020726481X")

jymap = Student["jymap"]
StudentInfo = Student['jgpmList'][0]
yhxxid = StudentInfo['yhxxid']  # 用户ID
xtid = jymap['xtid']  # 系统ID
pcid = jymap['pcid']  # 评测ID


def CallMD5(text):
    js_compiled = js_env.compile(js_code)
    js_func = 'md5("%s")' % text
    result = js_compiled.eval(js_func)
    return result


def reportVideoTime(time, kcid, spdz, jid, zsj, kczsc):
    md5 = CallMD5("jdxx" + str(kcid) + str(spdz) + str(jid) + "1218hnjj2020" + str(yhxxid))
    data = {
        "xtid": xtid,
        "kcid": kcid,
        "zid": spdz,
        "jid": jid,
        "spzsj": time,
        "pcid": pcid,
        "userid": yhxxid,
        "zyzsj": zsj,
        "kczsc": kczsc,
        "sign": md5
    }
    params = urlencode(data)
    res = requests.get("https://qmzxtest.17el.cn//phoneAction_timeGap.action?" + params, verify=False).text
    print(res)


def doCourses():
    for e in courses[8:]:
        kcid = e['kcid']
        courseInfo = getCourseInfo(kcid, yhxxid)
        childs = courseInfo['currnetChilds']
        # info = courseInfo['info']
        for e2 in childs:
            zsj = e2['zsj']
            jid = e2['id']
            zid = e2['fid']
            kczsc = e2['spzsj']
            for _ in range(60):
                reportVideoTime(kczsc, kcid, zid, jid, zsj, kczsc)
                #time.sleep(1)


def busyWork(kcid):
    res = session.get('https://qmzxtest.17el.cn//phoneAction_busywork.action?yhid=%s&xtid=%s&pcid=%s&kcid=%s' % (
        yhxxid, xtid, pcid, kcid), verify=False).text
    res = res.replace('null(', "")[0:-1]
    return json.loads(res)['map']


def submitWork(ids, kcid, zid, jid, data_dic):
    arr1_ori = data_dic
    res = session.get(
        "https://qmzxtest.17el.cn//phoneAction_busyworksub.action?yhid=%s&xtid=%s&pcid=%s&kcid=%s&zid=%s&jid=%s&ids=%s&allArr1=%s" % (
            yhxxid, xtid, pcid, kcid, zid, jid, parse.quote(ids), parse.quote(arr1_ori)), verify=False).text
    res = res.replace('null(', "")[0:-1]
    return json.loads(res)['map']


def doWork():
    for e in courses[4:]:
        kcid = e['kcid']
        work = busyWork(kcid)
        data_dic = "{"
        ids = ""
        for tea in work['jgpmList']:
            kcstid = tea['kcstid']
            zqda = tea['zqda']
            stfs = tea['stfs'] if not tea['stfs'] == 0 else 20
            da = tea['id']
            stlx = tea['stlx']
            data_dic += ("da%s:'%s'," % (da, str(zqda)))
            data_dic += ("zqda%s:'%s'," % (da, str(zqda)))
            data_dic += ("stfs%s:'%s'," % (da, str(stfs)))
            data_dic += ("kcstid%s:'%s'," % (da, str(kcstid)))
            data_dic += ("stlx%s:'%s'," % (da, str(stlx)))
            ids += str(da)
            ids += ','
        data_dic = data_dic[0:-1]
        data_dic += '}'
        ids = ids[0:-1]
        courseInfo = getCourseInfo(kcid, yhxxid)
        childs = courseInfo['currnetChilds']
        for e2 in childs:
            jid = e2['id']
            zid = e2['fid']
            res = submitWork(ids, kcid, zid, jid, data_dic)
            print(res)


doCourses()
doWork()
pass
# See PyCharm help at https://www.jetbrains.com/help/pycharm/
