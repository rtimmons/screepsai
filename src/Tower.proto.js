module.exports = {
  onTick(time) {
    var closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      this.attack(closestHostile);
    }

    // repair anything that can be repaired, but don't overdo it on the walls or ramparts
    // (they start out with millions of hits that the tower has to fill up)
    var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) =>
          s.hits < s.hitsMax &&
          (s.structureType != 'road' || s.hits <= 2500) &&
          ((s.structureType != 'constructedWall' &&
            s.structureType != 'rampart') || s.hits <= 3000),
      });
    if (closestDamagedStructure) {
      this.repair(closestDamagedStructure);
    }

    // surplus of energy - fill up walls up to 100k
    if (this.energy >= 900) {
      closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax &&
          (structure.structureType != 'constructedWall' || structure.hits <= 100000),
      });
      if (closestDamagedStructure) {
        this.repair(closestDamagedStructure);
      }
    }
  }
};
