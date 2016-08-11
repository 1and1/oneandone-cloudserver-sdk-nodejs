/**
 * Created by Ali on 8/11/2016.
 */

module.exports = {
    endPointPath: "public_ips",

    listPublicIps: function (callback) {
        req.is_get([this.endPointPath], callback)
    },

    listPublicIpsWithOptions: function (options, callback) {
        var path = this.endPointPath;
        if (options) {
            path += "?";
            if (options.page) {
                path += "&page=" + options.page;
            }
            if (options.perPage) {
                path += "&per_page=" + options.perPage;
            }
            if (options.sort) {
                path += "&sort=" + options.sort;
            }
            if (options.query) {
                path += "&q=" + options.query;
            }
            if (options.fields) {
                path += "&fields=" + options.fields;
            }
        }

        req.is_get([path], callback)
    },

    createPublicIp: function (json, callback) {
        req.is_post([this.endPointPath], json, callback)
    },

    getPublicIp: function (ip_id, callback) {
        req.is_get([this.endPointPath, ip_id], callback)
    },

    updatePublicIp: function (ip_id, json, callback) {
        req.is_put([this.endPointPath, ip_id], json, callback)
    },

    deletePublicIp: function (ip_id, callback) {
        req.is_del([this.endPointPath, ip_id], callback)
    },
}