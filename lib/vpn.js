/**
 * Created by Ali on 8/13/2016.
 */

module.exports = {
    vpnEndPointPath: "vpns",

    listVpns: function (callback) {
        req.is_get([this.vpnEndPointPath], callback)
    },

    listVpnsWithOptions: function (options, callback) {
        var path = this.vpnEndPointPath;
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
        req.is_post([this.vpnEndPointPath], json, callback)
    },

    getVpn: function (vpn_id, callback) {
        req.is_get([this.vpnEndPointPath, vpn_id], callback)
    },

    getConfigurationFile: function (vpn_id, callback) {
        req.is_get([this.vpnEndPointPath, vpn_id, "configuration_file"], callback)
    },

    updateVpn: function (vpn_id, json, callback) {
        req.is_put([this.vpnEndPointPath, vpn_id], json, callback)
    },

    deleteVpn: function (vpn_id, callback) {
        req.is_del([this.vpnEndPointPath, vpn_id], callback)
    },
}