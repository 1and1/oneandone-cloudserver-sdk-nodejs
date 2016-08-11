/**
 * Created by Ali on 8/11/2016.
 */
module.exports = {

    endPointPath: "load_balancers",

    listLoadBalancers: function (callback) {
        req.is_get([this.endPointPath], callback)
    },

    listLoadBalancersWithOptions: function (options, callback) {
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

    createLoadBalancer: function (json, callback) {
        req.is_post([this.endPointPath], json, callback)
    },

    getLoadBalancer: function (fp_id, callback) {
        req.is_get([this.endPointPath, fp_id], callback)
    },

    updateLoadBalancer: function (fp_id, json, callback) {
        req.is_put([this.endPointPath, fp_id], json, callback)
    },

    deleteLoadBalancer: function (fp_id, callback) {
        req.is_del([this.endPointPath, fp_id], callback)
    },

    listLoadBalancerServerIps: function (fp_id, callback) {
        req.is_get([this.endPointPath, fp_id, "server_ips"], callback)
    },

    assignServerIpToLoadBalancer: function (fp_id, json, callback) {
        req.is_post([this.endPointPath, fp_id, "server_ips"], json, callback)
    },

    getLoadBalancerServerIp: function (fp_id, ip_id, callback) {
        req.is_get([this.endPointPath, fp_id, "server_ips", ip_id], callback)
    },

    unassignServerIpFromLoadBalancer: function (fp_id, ip_id, json, callback) {
        req.is_del([this.endPointPath, fp_id, "server_ips", ip_id], json, callback)
    },

    listLoadBalancerRules: function (fp_id, callback) {
        req.is_get([this.endPointPath, fp_id, "rules"], callback)
    },

    addRulesToLoadBalancer: function (fp_id, json, callback) {
        req.is_post([this.endPointPath, fp_id, "rules"], json, callback)
    },

    getLoadBalancerRule: function (fp_id, rule_id, callback) {
        req.is_get([this.endPointPath, fp_id, "rules", rule_id], callback)
    },

    removeRuleFromLoadBalancer: function (fp_id, rule_id, json, callback) {
        req.is_del([this.endPointPath, fp_id, "rules", rule_id], json, callback)
    },
}