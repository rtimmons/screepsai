
module.exports = {

  role() {
    return this.memory.role;
  },

  getRole() {
    return this.role();
  },

  mode() {
    return this.memory.mode;
  },

  getMode() {
    return this.mode();
  },

  modeIs(mode) {
    return this.mode() === mode;
  }

};
