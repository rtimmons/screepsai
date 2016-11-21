var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var DecoratedCreep = require('DecoratedCreep');
var RGame = require('RGame');

class RMain {
  constructor(params) {
    this.memory = params.memory;
    this.game   = params.game;
    this.rgame  = new RGame({ game: Game });
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

    // l1 = 300
    // l2 = 600
    // l3 = 750

    var l1harvester = [
      WORK, MOVE, CARRY,
    ];

    var l2harvester = [
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      MOVE, MOVE,
      CARRY, CARRY,
    ];
    var l3harvester = [
      WORK,
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY,
    ];

    var l2builder = [
      WORK,
      WORK,
      WORK,
      WORK,
      CARRY, MOVE,
      MOVE, MOVE,
    ];
    var l3builder = [
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY,
    ];

    var l2upgrader = [
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      MOVE, MOVE,
      CARRY, CARRY,
    ];

    var l3upgrader = [
      WORK,
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY,
    ];

    var l1upgrader = [
      WORK, MOVE, CARRY,
    ];

    var ensure = [
      {
        role: 'harvester',
        atLeast: 1,
        whenAvailable: 750,
        bodyParts: l3harvester,
      },
      {
        role: 'upgrader',
        atLeast: 1,
        whenAvailable: 750,
        bodyParts: l3upgrader,
      },
      {
        role: 'builder',
        atLeast: 1,
        whenAvailable: 750,
        bodyParts: l3builder,
      },

      // let's get 2 of each
      {
        role: 'harvester',
        atLeast: 2,
        whenAvailable: 750,
        bodyParts: l3harvester,
      },
      {
        role: 'upgrader',
        atLeast: 2,
        whenAvailable: 750,
        bodyParts: l3upgrader,
      },
      {
        role: 'builder',
        atLeast: 2,
        whenAvailable: 750,
        bodyParts: l3builder,
      },

      // if we have base levels, then more
      {
        role: 'harvester',
        atLeast: 3,
        whenAvailable: 750,
        bodyParts: l3harvester,
      },
      {
        role: 'builder',
        atLeast: 3,
        whenAvailable: 750,
        bodyParts: l3builder,
      },

      // last in precedence - just keep on building upgraders
      // as long as we ahve enough builders and harvesters
      {
        role: 'upgrader',
        atLeast: 5,
        whenAvailable: 750,
        bodyParts: l3upgrader,
      },
    ];

    ensure.forEach((e) => {
      this.rgame.ensureCreepCount(e);
    });

    // To kill: Game.creeps['Harvester1'].suicide()
    // Also: StructureSpawn.renewCreep - http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#renewCreep

    // TODO: move somewhere else
    // TODO: repeat for all towers?
    var tower = this.game.getObjectById('583276ecf3a0a9785e5e5fa3');
    if (tower) {
      var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax,
        });
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }

      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      }
    }

    for (var name in this.game.creeps) {
      var creep = this.game.creeps[name];
      var deco = new DecoratedCreep(creep);
      deco.tick(Game.time);

      if (creep.memory.role == 'harvester') {
        roleHarvester.run(deco);
      }

      if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(deco);
      }

      if (creep.memory.role == 'builder') {
        roleBuilder.run(deco);
      }
    }
  }
}

module.exports = RMain;
