
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
  },

  inspect() {
    return JSON.stringify(this.memory);
  },

  hasEnergyCapacity() {
    return this.carry.energy < this.carryCapacity;
  },

  currentRoomController() {
    return this.room.controller;
  },

  constructionSites() {
    return this.room.find(FIND_CONSTRUCTION_SITES);
  },

  bestConstructionSite() {
    return this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  },

  atEnergyCapcity() {
    return this.carry.energy >= this.carryCapacity;
  },

  energyDrained() {
    return this.carry.energy <= 0;
  },

  clearTarget() {
    // who I'm targeting
    var targetId = this.memory.targetId;

    Memory.removeTarget(this.id, targetId);

    delete this.memory.targetId;
  }

};
