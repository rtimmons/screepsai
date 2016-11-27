
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

  setRoleMode(role, mode) {
    this.setRole(role);
    this.setMode(mode);
    this.say(`${role}/${mode}`);
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

  getTargetId() {
    return this.memory.targetId;
  },

  clearTarget() {
    // who I'm targeting
    var targetId = this.memory.targetId;

    Memory.removeTarget(this.id, targetId);

    delete this.memory.targetId;
  },

  setTarget(target) {
    // console.log(`${this.name} setting target to ${target.structureType}`);
    this.clearTarget();
    this.memory.targetId = target.id;

    Memory.targetingId(target.id)[this.id] = 1;
  }
};
