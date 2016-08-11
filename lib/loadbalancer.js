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

    getLoadBalancer: function (lb_id, callback) {
        req.is_get([this.endPointPath, lb_id], callback)
    },

    updateLoadBalancer: function (lb_id, json, callback) {
        req.is_put([this.endPointPath, lb_id], json, callback)
    },

    deleteLoadBalancer: function (lb_id, callback) {
        req.is_del([this.endPointPath, lb_id], callback)
    },

    listLoadBalancerServerIps: function (lb_id, callback) {
        req.is_get([this.endPointPath, lb_id, "server_ips"], callback)
    },

    assignServerIpToLoadBalancer: function (lb_id, json, callback) {
        req.is_post([this.endPointPath, lb_id, "server_ips"], json, callback)
    },

    getLoadBalancerServerIp: function (lb_id, ip_id, callback) {
        req.is_get([this.endPointPath, lb_id, "server_ips", ip_id], callback)
    },

    unassignServerIpFromLoadBalancer: function (lb_id, ip_id, json, callback) {
        req.is_del([this.endPointPath, lb_id, "server_ips", ip_id], json, callback)
    },

    listLoadBalancerRules: function (lb_id, callback) {
        req.is_get([this.endPointPath, lb_id, "rules"], callback)
    },

    addRulesToLoadBalancer: function (lb_id, json, callback) {
        req.is_post([this.endPointPath, lb_id, "rules"], json, callback)
    },

    getLoadBalancerRule: function (lb_id, rule_id, callback) {
        req.is_get([this.endPointPath, lb_id, "rules", rule_id], callback)
    },

    removeRuleFromLoadBalancer: function (lb_id, rule_id, json, callback) {
        req.is_del([this.endPointPath, lb_id, "rules", rule_id], json, callback)
    },
}