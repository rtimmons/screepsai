var Deco = require('DecoratedCreep');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
      delete creep.memory.upgrading;

        if(creep.memory.mode == 'upgrading' && creep.carry.energy <= 0) {
            creep.say('harvesting');
            creep.memory.mode = 'harvesting';
        }
        if(creep.memory.mode != 'upgrading' && creep.carry.energy >= creep.carryCapacity) {
            creep.say('upgrading');
            creep.memory.mode = 'upgrading';
        }

        if(creep.memory.mode == 'upgrading') {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            // TODO: find closest source
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
    }
};

module.exports = roleUpgrader;