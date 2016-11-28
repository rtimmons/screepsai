module.exports = {

  onStructureTick(structure, context, config) {
    if (!structure.repair) {
      return;
    }

    // repair anything that can be repaired, but don't overdo it on the walls or ramparts
    // (they start out with millions of hits that the tower has to fill up)
    var closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) =>
        s.hits < s.hitsMax &&
        (s.structureType != 'road' || s.hits <= 2500) &&
        ((s.structureType != 'constructedWall' &&
          s.structureType != 'rampart') || s.hits <= 3000),
    });

    if (closestDamagedStructure) {
      structure.repair(closestDamagedStructure);
    }
  },
};
