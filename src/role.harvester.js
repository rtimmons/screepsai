var Deco = require('DecoratedCreep');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var deco = new Deco(creep);

        if(deco.hasEnergyCapacity()) {
            var sources = creep.room.find(FIND_SOURCES,{filter: s => s.energy > 50}).sort(
                (a,b) => b.energy - a.energy
            )
            deco.moveAndDo(sources[0], 'harvest');
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
                deco.unlessInRnage(targets[0], 
                    (creep,target) => creep.transfer(target, RESOURCE_ENERGY)
                );
            }
            // else {
            //     deco.setRole('builder');
            // }
        }
    }
};

module.exports = roleHarvester;