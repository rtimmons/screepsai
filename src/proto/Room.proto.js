module.exports = {

  structuresWhere(predicate) {
    return this.find(FIND_STRUCTURES, {
      filter: predicate,
    });
  },

};
