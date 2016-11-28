module.exports = {

  typeIn() {
    for (var arg in arguments) {
      if (this.structureType === arg) {
        return true;
      }
    }
    return false;
  },

};
