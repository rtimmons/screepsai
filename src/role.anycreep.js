var Deco = require('DecoratedCreep');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var deco = new Deco(creep);

        if(creep.memory.building && creep.memory.construction) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
              creep.memory.construction = false;
            }
        }
        else if(creep.memory.building) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            // TODO: some way to find closest source?
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleBuilder;