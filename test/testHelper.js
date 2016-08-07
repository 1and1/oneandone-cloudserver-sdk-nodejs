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
