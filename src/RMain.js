var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var RGame = require('RGame');

class RMain {
  constructor(params) {
    this.memory = params.memory;
    this.game   = params.game;
    this.rgame  = new RGame();
  }
  tick() {

    this.rgame.ensureCreepCount({
      role: 'harvester',
      atLeast: 5,
      bodyParts: [WORK,CARRY,MOVE]
    });
    // this.rgame.ensureCreepCount({
    //   role: 'builder',
    //   atLeast: 15,
    //   bodyParts: [WORK,CARRY,MOVE]
    // });
    // this.rgame.ensureCreepCount({
    //   role: 'upgrader',
    //   atLeast: 10,
    //   bodyParts: [WORK,CARRY,MOVE]
    // });

    // To kill: Game.creeps['Harvester1'].suicide()
    // Also: StructureSpawn.renewCreep - http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#renewCreep

    // var tower = this.game.getObjectById('TOWER_ID');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }
    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

    for(var name in this.game.creeps) {
        var creep = this.game.creeps[name];
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
}

module.exports = RMain;