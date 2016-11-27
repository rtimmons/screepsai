// Not really "prototype" methods because Memory is static

module.exports = {
  targetingId(id) {
    Memory.targeting = Memory.targeting || {};
    Memory.targeting[id] = Memory.targeting[id] || {};
    return Memory.targeting[id];
  },

  removeTarget(creepId, targetId) {
    // others also targeting targetId
    var targeting = Memory.targetingId(targetId);

    delete targeting[creepId];
    if (_.size(Memory.targeting[targetId]) == 0) {
      delete Memory.targeting[targetId];
    }
  }
};
