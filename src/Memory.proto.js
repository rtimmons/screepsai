// Not really "prototype" methods because Memory is static

module.exports = {
  targetingId(id) {
    Memory.targeting = Memory.targeting || {};
    Memory.targeting[id] = Memory.targeting[id] || {};
    return Memory.targeting[id];
  },
};
