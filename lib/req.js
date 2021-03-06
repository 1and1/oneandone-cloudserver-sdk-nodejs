/**
 * Created by Ali on 7/28/2016.
 */
module.exports = {

    request: require('request'),

    options: {
        headers: {}
        //auth : {}, // if the auth obj is present, it won't allow other auth to be used.
    },

    endpoint: ""
    ,

    setendpoint: function (ep) {
        req.options.baseUrl = ep
    },

    fullheader: function () {
        req.options.headers['Content-Type'] = 'application/json'
    },

    putheader: function () {
        req.options.headers['Content-Type'] = 'application/json'
    },

    oneandoneauth: function (token) {
        req.options.headers['X-TOKEN'] = token
    },

    fallback: function (error, response, body) {
        if (error) {
            return ( console.log("Error", error))
        }
        if (response) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
        }

        if (body) {
            console.log("Body", body)

        }
    },

    mk_url: function (aray, callback) {

        aray.unshift(req.endpoint)
        req.options.url = aray.join("/")

        return req.options.url
    },

    is_del: function (aray, callback) {
        if (!callback) {
            callback = req.fallback
        }

        req.mk_url(aray)
        req.fullheader()

        req.request.del(req.options, callback)
    },

    is_delWithBody: function (aray, jason, callback) {
        if (!callback) {
            callback = req.fallback
        }

        req.mk_url(aray)
        req.options.body = JSON.stringify(jason)
        req.fullheader()

        req.request.del(req.options, callback)
    },

    is_get: function (aray, callback) {
        if (!callback) {
            callback = req.fallback
        }

        req.mk_url(aray)
        req.fullheader()

        req.request.get(req.options, callback)

    },

    is_put: function (aray, jason, callback) {
        if (!callback) {
            callback = req.fallback
        }

        req.mk_url(aray)
        req.options.body = JSON.stringify(jason)
        req.fullheader()

        req.request.put(req.options, callback)
    },


    is_post: function (aray, jason, callback) {
        if (!callback) {
            callback = req.fallback
        }

        req.mk_url(aray)
        req.options.body = JSON.stringify(jason)
        req.fullheader()

        req.request.post(req.options, callback)
    },
}




