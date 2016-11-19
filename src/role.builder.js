var Deco = require('DecoratedCreep');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var deco = new Deco(creep);

        if (deco.energyDrained()) {
            deco.setMode('harvesting');
        }
        else if(deco.modeIs('building')) {
            if (deco.energyDrained()) {
                deco.setMode('harvesting');
            }
        }
        if (deco.modeIs('harvesting') && deco.atEnergyCapcity()) {
            deco.setMode('constructing');
        }

        if(deco.modeIs('constructing')) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                deco.moveAndDo(targets[0], 'build')
            }
            else {
                deco.setMode('building');
            }
        }

        else if (deco.modeIs('harvesting')) {
            // TODO: some way to find closest source?
            var sources = creep.room.find(FIND_SOURCES);
            deco.moveAndDo(sources[0], 'harvest');
        }

        else if (deco.modeIs('building')) {
            deco.moveAndDo(creep.room.controller, 'upgradeController');
        }
        
        else { deco.setMode('harvesting'); }
    }
};

module.exports = roleBuilder;