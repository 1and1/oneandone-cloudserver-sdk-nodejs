/**
 * Created by Ali on 7/28/2016.
 */
merge = require('./merge')
req = require('./req')
var oneandone = {}
/**
 merge is used to "flatten" functions
 into the top level namespace

 instead of calling

 oneandone.oneandone.datacenter

 with merge we can call

 oneandone.datacenter
 **/
merge('./server', oneandone)
merge('./req.js', oneandone)
merge('./request', oneandone)
merge('./types', oneandone)
merge('./image', oneandone)
merge('./shared-storage', oneandone)
merge('./firewall-policy', oneandone)
merge('./loadbalancer', oneandone)
merge('./public-ip', oneandone)

module.exports = (function () {
    return oneandone
})()

