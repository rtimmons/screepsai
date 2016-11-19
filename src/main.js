var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var RGame = require('RGame');


module.exports.loop = function () {

    var rgame = new RGame();

    rgame.ensureCreepCount({
      role: 'harvester',
      atLeast: 1,
      bodyParts: [WORK,CARRY,MOVE]
    });
    rgame.ensureCreepCount({
      role: 'builder',
      atLeast: 1,
      bodyParts: [WORK,CARRY,MOVE]
    });
    rgame.ensureCreepCount({
      role: 'upgrader',
      atLeast: 3,
      bodyParts: [WORK,CARRY,MOVE]
    });

    // To kill: Game.creeps['Harvester1'].suicide()
    // Also: StructureSpawn.renewCreep - http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#renewCreep

    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}