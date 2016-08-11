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

 oneandone.bricks.datacenter

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


oneandone.printMsg = function () {

    return (console.log("liboneandone is the package name"))
}

module.exports = (function () {
    return oneandone
})()

