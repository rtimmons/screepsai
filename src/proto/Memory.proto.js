// Not really "prototype" methods because Memory is static

module.exports = {
  targetingId(targetId) {
    Memory.targeting = Memory.targeting || {};
    return Memory.targeting[targetId];
  },

  addTarget(creepId, targetId) {
    Memory.targeting[targetId] = Memory.targeting[targetId] || {};
    Memory.targeting[targetId][creepId] = 1;
  },

  removeTarget(creepId) {
    var creepMemory = Memory.creeps[creepId];
    if (!creepMemory) {
      return;
    }

    var targetId = creepMemory.targetId;
    delete creepMemory.targetId;

    // others also targeting targetId
    var targeting = Memory.targetingId(targetId);

    if(!targeting) {
      return;
    }

    delete targeting[creepId];
    if (Memory.targeting[targetId] && _.size(Memory.targeting[targetId]) <= 0) {
      delete Memory.targeting[targetId];
    }
  }
};
