module.exports = {

  typeIn() {
    for (var k in arguments) {
      if (this.structureType === arguments[k]) {
        return true;
      }
    }

    return false;
  },

};
