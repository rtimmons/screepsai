var Deco = require('DecoratedCreep');

var roleUpgrader = {
    run: function(creep) {
        var deco = new Deco(creep);

        if(!deco.modeIs('harvesting') && deco.energyDrained()) {
            deco.setMode('harvesting');
        }
        if(!deco.modeIs('upgrading') && deco.atEnergyCapcity()) {
            deco.setMode('upgrading');
        }

        if (deco.modeIs('upgrading')) {
            deco.moveAndDo(creep.room.controller, 'upgradeController');
        }
        else {
            deco.moveAndDo(deco.bestSource(), 'harvest');
        }
    }
};

module.exports = roleUpgrader;