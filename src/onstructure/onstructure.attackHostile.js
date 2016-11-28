module.exports = {

  onStructureTick(structure, context, config) {
    if (!structure.attack) {
      return;
    }

    var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      structure.attack(closestHostile);
    }
  },
};
