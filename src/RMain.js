var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleInfantry = require('role.infantry');

var RGame = require('RGame');

class RMain {
  constructor(params) {
    this.memory = params.memory;
    this.game   = params.game;
    this.rgame  = new RGame({ game: Game });
  }

  spawn() {

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
    // l4 = 1200

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
      WORK,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY,
    ];
    var l4harvester = [
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY, CARRY,
      CARRY, CARRY,
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
    var l4builder = [
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY, CARRY,
      CARRY, CARRY,
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
      WORK,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY,
    ];
    var l4upgrader = [
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      WORK,
      MOVE, MOVE,
      MOVE, MOVE,
      CARRY, CARRY,
      CARRY, CARRY,
      CARRY, CARRY,
      CARRY, CARRY,
    ];

    var l1upgrader = [
      WORK, MOVE, CARRY,
    ];

    var ensure = [
      {
        role: 'harvester',
        atLeast: 1,
        whenAvailable: 1200,
        bodyParts: l4harvester,
        level: 4,
      },
      {
        role: 'upgrader',
        atLeast: 1,
        whenAvailable: 1200,
        bodyParts: l4upgrader,
        level: 4,
      },
      {
        role: 'builder',
        atLeast: 1,
        whenAvailable: 1200,
        bodyParts: l4builder,
      },

      // let's get 2 of each
      {
        role: 'harvester',
        atLeast: 2,
        whenAvailable: 1200,
        bodyParts: l4harvester,
        level: 4,
      },
      {
        role: 'upgrader',
        atLeast: 2,
        whenAvailable: 1200,
        bodyParts: l4upgrader,
        level: 4,
      },

      // {
      //   role: 'builder',
      //   atLeast: 2,
      //   whenAvailable: 1200,
      //   bodyParts: l4builder,
      //   level: 4,
      // },

      // if we have base levels, then more
      {
        role: 'harvester',
        atLeast: 3,
        whenAvailable: 1200,
        bodyParts: l4harvester,
        level: 4,
      },

      {
        role: 'builder',
        atLeast: 3,
        whenAvailable: 1200,
        bodyParts: l4builder,
        level: 4,
      },

      // last in precedence - just keep on building upgraders
      // as long as we ahve enough builders and harvesters
      {
        role: 'upgrader',
        atLeast: 3,
        whenAvailable: 1200,
        bodyParts: l4upgrader,
        level: 4,
      },
    ];

    ensure.forEach((e) => {
      this.rgame.ensureCreepCount(e);
    });

    // To kill: Game.creeps['Harvester1'].suicide()
    // Also: StructureSpawn.renewCreep - http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#renewCreep

  }

  controlTower(towerId) {
    // TODO: move somewhere else
    // TODO: repeat for all towers?
    var tower = this.game.getObjectById(towerId);
    if (tower) {

      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      }

      // repair anything that can be repaired, but don't overdo it on the walls or ramparts
      // (they start out with millions of hits that the tower has to fill up)
      var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) =>
            s.hits < s.hitsMax &&
            (s.structureType != 'road' || s.hits <= 2500) &&
            ((s.structureType != 'constructedWall' &&
              s.structureType != 'rampart') || s.hits <= 3000),
        });
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }

      // surplus of energy - fill up walls up to 100k
      if (tower.energy >= 900) {
        closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax &&
            (structure.structureType != 'constructedWall' || structure.hits <= 100000),
        });
        if (closestDamagedStructure) {
          tower.repair(closestDamagedStructure);
        }
      }
    }
  }

  tick() {
    this.spawn();
    this.controlTower('583276ecf3a0a9785e5e5fa3');
    this.controlTower('58370345a19b6bfd464d5f97');

    for (var name in this.game.creeps) {
      var creep = this.game.creeps[name];
      creep.tick(Game.time);

      if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      }

      if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      }

      if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      }

      if (creep.memory.role == 'infantry') {
        roleInfantry.run(creep);
      }
    }
  }
}

module.exports = RMain;
