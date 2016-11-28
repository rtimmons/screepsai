module.exports = {

  onStructureTick(structure, context, config) {
    if (!structure.repair) {
      return;
    }

    // surplus of energy - fill up walls up to 100k
    if (structure.energy >= 900) {
      closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax &&
          (s.structureType != 'constructedWall' || s.hits <= 100000),
      });
      if (closestDamagedStructure) {
        structure.repair(closestDamagedStructure);
      }
    }
  },
};
