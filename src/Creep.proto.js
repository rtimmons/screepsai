
module.exports = {

  ttl() {
    return this.ticksToLive;
  },

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

  setRole(role) {
    if (this.memory.role === role) {
      return;
    }

    this.clearTarget();
    this.memory.role = role;
    this.say(role);
  },

  setMode(mode) {
    if (this.memory.mode == mode) {
      return;
    }

    this.clearTarget();
    this.memory.mode = mode;
    this.say(mode);
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

  getTargetingDescription() {
    var targetId = this.getTargetId();
    if (!targetId) { return 'none'; }

    var target = Game.getObjectById(targetId);
    if (!target) { return '<dne>'; }

    return `${target.structureType} (${targetId})`;
  },

  toString() {
    return `${this.getRole()}/${this.getMode()}!${this.ttl()} -> ${this.getTargetingDescription()}`;
  },

  tick(time) {

    // we never get here with ticksToLive == 0
    if (this.ticksToLive <= 1) {
      this.clearTarget();
    }
  },

  clearTarget() {

    // who I'm targeting
    var targetId = this.memory.targetId;

    Memory.removeTarget(this.id, targetId);

    delete this.memory.targetId;
  },

  moveAndDo(target, action) {
    var out = this[action](target);

    if (out == ERR_NOT_IN_RANGE || out == ERR_NOT_ENOUGH_ENERGY) {
      this.setTarget(target);
      this.moveTo(target);
    }
  },

  setTarget(target) {
    // console.log(`${this.name} setting target to ${target.structureType}`);
    this.clearTarget();
    this.memory.targetId = target.id;

    Memory.targetingId(target.id)[this.id] = 1;
  }
};
