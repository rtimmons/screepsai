var Deco = require('DecoratedCreep');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var deco = new Deco(creep);

        if(deco.hasEnergyCapacity()) {
            var sources = creep.room.find(FIND_SOURCES);
            deco.moveAndDo(sources[1], 'harvest');
        }
        else {
            var targets = deco.structuresWhere((structure) => 
                (structure.structureType == STRUCTURE_EXTENSION ||
                 structure.structure     == STRUCTURE_CONTROLLER ||
                 structure.structureType == STRUCTURE_SPAWN ||
                 structure.structureType == STRUCTURE_TOWER)
                && structure.energy < structure.energyCapacity
            );
            if(targets.length > 0) {
                deco.moveAndDo(targets[0], 'transfer', RESOURCE_ENERGY);
            }
            else {
                deco.setRole('builder');
            }
        }
    }
};

module.exports = roleHarvester;