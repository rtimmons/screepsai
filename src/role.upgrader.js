var Deco = require('DecoratedCreep');

var roleUpgrader = {
    run: function(creep) {
        var deco = new Deco(creep);

        if(deco.modeIs('upgrading') && deco.energyDrained()) {
            deco.setMode('harvesting');
        }
        else if(!deco.modeIs('upgrading') && deco.hasEnergyCapacity()) {
            deco.setMode('upgrading');
        }

        if (deco.modeIs('upgrading')) {
            deco.moveAndDo(creep.room.controller, 'upgradeController');
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            // if(creep.name == 'John') {
            //     console.log(deco.mode() + ' => ' + deco.energyDrained() + ' => ' + sources[0]);
            // }

            deco.moveAndDo(sources[0], 'harvest');
        }
    }
};

module.exports = roleUpgrader;