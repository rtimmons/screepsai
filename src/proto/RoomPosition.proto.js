module.exports = {

  closestStructureWhere(predicate) {
    return this.findClosestByPath(FIND_STRUCTURES, {
      filter: predicate,
    });
  },

};
