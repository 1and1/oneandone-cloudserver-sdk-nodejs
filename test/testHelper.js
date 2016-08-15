/**
 * Created by Ali on 7/28/2016.
 */

var token = '4f34bcc24bf7bbf6af2fac5e35e600d8';
var oneandone = require('../lib/liboneandone');
var helper = {};

helper.checkServerReady = function (currentServer, callback) {
    var checkServer = {};
    oneandone.getServer(currentServer.id, function (error, response, body) {
        checkServer = JSON.parse(body);
        if ((checkServer.status.state != oneandone.ServerState.POWERED_OFF
            && checkServer.status.state != oneandone.ServerState.POWERED_ON)
            || (checkServer.status.percent != null && checkServer.status.percent != 0)) {
            setTimeout(function () {
                helper.checkServerReady(checkServer, callback);
            }, 5000);
        } else {
            callback();
        }
    });
};

helper.checkPrivateNetworkReady = function (currentServer, privateNetwork, callback) {
    var checkPn = {};
    oneandone.getServerPrivateNetwork(currentServer.id, privateNetwork.id,
        function (error, response, body) {
            checkPn = JSON.parse(body);
            if (checkPn.state != oneandone.GenericState.ACTIVE) {
                setTimeout(function () {
                    helper.checkPrivateNetworkReady(currentServer, privateNetwork, callback);
                }, 5000);
            } else {
                callback();
            }
        }
    )
    ;
};

helper.turnOffServer = function (serverToTurnOff, callback) {
    updateData = {
        "action": oneandone.ServerUpdateAction.POWER_OFF,
        "method": oneandone.ServerUpdateMethod.SOFTWARE
    };
    helper.checkServerReady(serverToTurnOff, function () {
        oneandone.updateServerStatus(serverToTurnOff.id, updateData, function (error, response, body) {
            callback();
        });
    });
};

helper.getRandomServerWithMonitoringPolicy = function (callback) {
    var servers = [];
    var currentServer = {};
    oneandone.listServers(function (error, response, body) {
        servers = JSON.parse(body);
        var i = 0;

        function myLoop(i) {
            if (i < servers.length) {
                oneandone.getServer(servers[i].id, function (error1, response1, body1) {
                    currentServer = JSON.parse(body1);
                    if (currentServer.monitoring_policy) {
                        callback(currentServer);
                    } else {
                        myLoop(i + 1);
                    }
                });
            }
        };
        myLoop(0);
    });
};

helper.updateServerData = function (getServer, callback) {
    oneandone.getServer(getServer.id, function (error, response, body) {
        var object = JSON.parse(body);
        callback(object);
    });
};
helper.authenticate = function (oneandone) {
    oneandone.oneandoneauth(token);
};

helper.getToken = function () {
    return token;
};

module.exports = (function () {
    return helper
})()
