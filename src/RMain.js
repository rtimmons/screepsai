var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var Bus = require('Bus');
var RGame = require('RGame');

class RMain {
  constructor(params) {
    this.memory = params.memory;
    this.game   = params.game;
    this.bus    = new Bus();
    this.rgame  = new RGame();
  }
  tick() {

    this.rgame.ensureCreepCount({
      role: 'harvester',
      atLeast: 10,
      bodyParts: [WORK,CARRY,MOVE]
    });
    this.rgame.ensureCreepCount({
      role: 'builder',
      atLeast: 10,
      bodyParts: [WORK,CARRY,MOVE]
    });
    this.rgame.ensureCreepCount({
      role: 'upgrader',
      atLeast: 20,
      bodyParts: [WORK,CARRY,MOVE]
    });

    // To kill: Game.creeps['Harvester1'].suicide()
    // Also: StructureSpawn.renewCreep - http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#renewCreep

    for(var name in this.memory.creeps) {
      if(!this.memory.creeps[name]) {
        delete this.memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    var tower = this.game.getObjectById('TOWER_ID');
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