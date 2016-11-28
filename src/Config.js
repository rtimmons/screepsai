const BASE = {

  targetingTtlTicks: 750,

  towerIds: [
    '583276ecf3a0a9785e5e5fa3',
    '58370345a19b6bfd464d5f97',
  ],

  ensureCreeps: [
    {
      key: 'l4harvester',
      atLeast: 1,
      whenAvailable: 1200,
    },
    {
      key: 'l4upgrader',
      atLeast: 1,
      whenAvailable: 1200,
    },
    {
      key: 'l4builder',
      atLeast: 1,
      whenAvailable: 1200,
    },

    // let's get 2 of each
    {
      key: 'l4harvester',
      atLeast: 2,
      whenAvailable: 1200,
    },
    {
      key: 'l4upgrader',
      atLeast: 2,
      whenAvailable: 1200,
    },

    {
      key: 'l4harvester',
      atLeast: 3,
      whenAvailable: 1200,
    },

    {
      key: 'l4builder',
      atLeast: 3,
      whenAvailable: 1200,
    },

    // last in precedence - just keep on building upgraders
    // as long as we ahve enough builders and harvesters
    {
      key: 'l4upgrader',
      atLeast: 3,
      whenAvailable: 1200,
    },
  ],

  creepTypes: {

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

    // WORK = 100
    // MOVE = 50
    // CARRY = 50

    // l1 = 300
    // l2 = 600
    // l3 = 750
    // l4 = 1200

    l1harvester: {
      role: 'harvester',
      level: 1,
      parts: {
        WORK: 1,
        MOVE: 1,
        CARRY: 1,
      },
    },

    l2harvester: {
      role: 'harvester',
      level: 2,
      parts: {
        WORK: 3,
        MOVE: 4,
        CARRY: 2,
      },
    },

    l3harvester: {
      role: 'harvester',
      level: 3,
      parts: {
        WORK: 5,
        MOVE: 2,
        CARRY: 3,
      },
    },

    l4harvester: {
      role: 'harvester',
      level: 4,
      parts: {
        WORK: 5,
        MOVE: 4,
        CARRY: 9,
      },
    },

    l1builder: {
      role: 'builder',
      level: 1,
      parts: {
        WORK: 1,
        CARRY: 1,
        MOVE: 1,
      },
    },

    l2builder: {
      role: 'builder',
      level: 2,
      parts: {
        WORK: 4,
        CARRY: 1,
        MOVE: 3,
      },
    },

    l3builder: {
      role: 'builder',
      level: 3,
      parts: {
        WORK: 5,
        CARRY: 3,
        MOVE: 2,
      },
    },

    l4builder: {
      role: 'builder',
      level: 4,
      parts: {
        WORK: 6,
        CARRY: 6,
        MOVE: 4,
      },
    },

    l1upgrader: {
      role: 'upgrader',
      level: 1,
      parts: {
        WORK: 1,
        CARRY: 1,
        MOVE: 1,
      },
    },

    l2upgrader: {
      role: 'upgrader',
      level: 2,
      parts: {
        WORK: 3,
        CARRY: 2,
        MOVE: 4,
      },
    },

    l3upgrader: {
      role: 'upgrader',
      level: 3,
      parts: {
        WORK: 5,
        CARRY: 3,
        MOVE: 2,
      },
    },

    l4upgrader: {
      role: 'upgrader',
      level: 4,
      parts: {
        WORK: 6,
        CARRY: 8,
        MOVE: 4,
      },
    },
  },
};

function _get(key, memory) {
  return memory.config[key] || BASE[key];
}

class Config {
  constructor(memory) {
    this.memory = memory;
    this.memory.config = this.memory.config || {};
  }

  get(key) {
    return _get(key, this.memory);
  }
}

module.exports = {
  class: Config,
  get: _get,
};
