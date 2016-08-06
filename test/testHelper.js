/**
 * Created by Ali on 7/28/2016.
 */

var token = '4f34bcc24bf7bbf6af2fac5e35e600d8';

var helper = {};

helper.authenticate = function (oneandone) {
    oneandone.oneandoneauth(token);
};

helper.getToken = function () {
    return token;
};

module.exports = (function () {
    return helper
})()
