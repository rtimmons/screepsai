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
            var sources = creep.room.find(FIND_SOURCES,{filter: s => s.energy > 50}).sort(
              (a,b) => b.energy - a.energy
            )
            // if(creep.name == 'John') {
            //     console.log(deco.mode() + ' => ' + deco.energyDrained() + ' => ' + sources[0]);
            // }

            deco.moveAndDo(sources[0], 'harvest');
        }
    }
};

module.exports = roleUpgrader;