/**
 * Created by Ali on 7/28/2016.
 */
module.exports = {
    ServerState: {
        POWERING_ON: "POWERING_ON",
        POWERING_OFF: "POWERING_OFF",
        POWERED_ON: "POWERED_ON",
        POWERED_OFF: "POWERED_OFF",
        DEPLOYING: "DEPLOYING",
        REBOOTING: "REBOOTING",
        REMOVING: "REMOVING",
        CONFIGURING: "CONFIGURING"
    },

    ServerUpdateAction: {
        POWER_ON: "POWER_ON",
        POWER_OFF: "POWER_OFF",
        REBOOT: "REBOOT"
    },

    ServerUpdateMethod: {
        SOFTWARE: "SOFTWARE",
        HARDWARE: "HARDWARE"
    }


};
