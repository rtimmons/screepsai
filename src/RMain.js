var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var DecoratedCreep = require('DecoratedCreep');
var RGame = require('RGame');

class RMain {
  constructor(params) {
    this.memory = params.memory;
    this.game   = params.game;
    this.rgame  = new RGame();
  }
  tick() {

    /*
Body part	Build cost	Effect per one body part
MOVE	50	Decreases fatigue by 2 points per tick.
WORK	100	 Harvests 2 energy units from a source per tick.
          Builds a structure for 5 energy units per tick.
          Repairs a structure for 100 hits per tick consuming 1 energy unit per tick.
          Dismantles a structure for 50 hits per tick returning 0.25 energy unit per tick.
        Upgrades a controller for 1 energy unit per tick.

CARRY	50	Can contain up to 50 resource units.
ATTACK	80	
    Attacks another creep/structure with 30 hits per tick in a short-ranged attack.
RANGED_ATTACK	150	 
    Attacks another single creep/structure with 10 hits per tick in a long-range attack up to 3 squares long.
    Attacks all hostile creeps/structures within 3 squares range with 1-4-10 hits (depending on the range).

HEAL	250	  
    Heals self or another creep restoring 12 hits per tick in short range or 4 hits per tick at a distance.
CLAIM	600	
    Claims a neutral room controller.
    Reserves a neutral room controller for 1 tick per body part.
    Attacks a hostile room controller downgrade or reservation timer with 1 tick per 5 body parts.
    A creep with this body part will have a reduced life time of 500 ticks and cannot be renewed.

TOUGH	10
    No effect, just additional hit points to the creep's body. Can be boosted to resist damage.

    */
    // 2016-11-19: have 500 capacity

    // WORK = 100
    // MOVE = 50
    // CARRY = 50
    this.rgame.ensureCreepCount({
      role: 'harvester',
      atLeast: 3,
      whenAvailable: 550,
      bodyParts: [
        WORK,
        WORK,
        MOVE,  MOVE,
        CARRY, CARRY,
        CARRY, CARRY,
      ]
    });
    // this.rgame.ensureCreepCount({
    //   role: 'builder',
    //   atLeast: 3,
    //   whenAvailable: 550,
    //   bodyParts: [
    //     WORK,
    //     WORK,
    //     WORK,
    //     WORK,
    //     CARRY,CARRY,
    //     MOVE
    //   ]
    // });
    this.rgame.ensureCreepCount({
      role: 'upgrader',
      atLeast: 10,
      whenAvailable: 550,
      bodyParts: [
        WORK,
        WORK,
        WORK,
        MOVE, MOVE,
        CARRY,CARRY,
      ]
    });

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
        var deco = new DecoratedCreep(creep);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(deco);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(deco);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(deco);
        }
    }
  }
}

module.exports = RMain;