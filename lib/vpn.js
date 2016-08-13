/**
 * Created by Ali on 8/13/2016.
 */

module.exports = {
    endPointPath: "vpns",

    listVpns: function (callback) {
        req.is_get([this.endPointPath], callback)
    },

    listVpnsWithOptions: function (options, callback) {
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

    createVpn: function (json, callback) {
        req.is_post([this.endPointPath], json, callback)
    },

    getVpn: function (vpn_id, callback) {
        req.is_get([this.endPointPath, vpn_id], callback)
    },

    getConfigurationFile: function (vpn_id, callback) {
        req.is_get([this.endPointPath, vpn_id, "configuration_file"], callback)
    },

    updateVpn: function (vpn_id, json, callback) {
        req.is_put([this.endPointPath, vpn_id], json, callback)
    },

    deleteVpn: function (vpn_id, callback) {
        req.is_del([this.endPointPath, vpn_id], callback)
    },
}