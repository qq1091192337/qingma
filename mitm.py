from mitmproxy.http import flow


def request(flow: flow):
    # 获取所有头信息，包含Host、User-Agent、Content-type等字段
    # print(flow.request.headers)

    # 域名
    # print(flow.request.host)

    # 请求方式：POST、GET等
    # print(flow.request.method)

    # 请求类型：http、https
    # print(flow.request.scheme)

    # 请求的路径，URL除域名之外的内容
    # print(flow.request.path)

    # 请求中body的内容，有一些http会把请求参数放在body里面，可通过此方法获取，返回字典类型
    # print(flow.request.get_text())

    # 返回MultiDictView类型的数据，URL的键值参数
    # print(flow.request.query)

    # 完整的请求地址，包含域名及请求参数，但是不包含放在body里面的请求参数
    if 'http://zsjypt.cdn.bcebos.com/media' in flow.request.url:
        # 取得请求参数wd的值
        # print(flow.request.query.get('wd'))

        # 取得所有请求参数
        print(list(flow.request.query.keys()))

        flow.request.headers["Referer"] = flow.request.query.set_all
        # 修改请求参数
        # 打印修改过后的参数
        print(flow.request.query.get('wd'))
