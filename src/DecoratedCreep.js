// The Screeps API is pretty low-level. This raises it up a notch
class DecoratedCreep {
  constructor(delegate) {
    this.delegate = delegate;
  }

  role() {
    return this.delegate.memory.role;
  }

  setRole(role) {
    this._clearTarget();
    this.delegate.memory.role = role;
  }

  mode() {
    return this.delegate.memory.mode;
  }

  getMode() {
    return this.delegate.memory.mode;
  }

  setMode(mode) {
    this._clearTarget();
    this.delegate.memory.mode = mode;
  }

  modeIs(mode) {
    return this.getMode() == mode;
  }

  _clearTarget() {
    delete this.delegate.memory.target;
  }

  structuresWhere(predicate) {
    return this.delegate.room.find(FIND_STRUCTURES, { filter: predicate });
  }

  closestStructureWhere(predicate) {
    return this.delegate.pos.findClosestByPath(FIND_STRUCTURES, { filter: predicate });
  }

  unlessInRnage(target, onTarget) {
    var result = onTarget(this.delegate, target);
    if (result == ERR_NOT_IN_RANGE) {
      this.delegate.moveTo(target);
    }
  }

  moveAndDo(target, action) {
    if (this.delegate[action](target) == ERR_NOT_IN_RANGE) {
      this.delegate.moveTo(target);
    }
  }

  inspect() {
    return JSON.stringify(this.delegate.memory);
  }

  hasEnergyCapacity() {
    return this.delegate.carry.energy < this.delegate.carryCapacity;
  }

  currentRoomController() {
    return this.delegate.room.controller;
  }

  bestEnergyDeposit() {
    var target = this.closestStructureWhere((structure) =>
        (structure.structureType == STRUCTURE_EXTENSION ||
         structure.structure     == STRUCTURE_CONTROLLER ||
         structure.structureType == STRUCTURE_SPAWN ||
         structure.structureType == STRUCTURE_TOWER)
        && structure.energy < structure.energyCapacity
    );
    return target;
  }

  bestSource() {
    var target = this.delegate.pos.findClosestByPath(FIND_SOURCES,
      { filter: s => s.energy > 50 });
    return target;
  }

  harvestFromBestSource() {
    this.deco.moveAndDo(this.bestSource(), 'harvest');
  }

  upgradeRoomController() {
    this.moveAndDo(this.delegate.room.controller, 'upgradeController');
  }

  bestConstructionSite() {
    return this.delegate.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  }

  constructionSites() {
    return this.delegate.room.find(FIND_CONSTRUCTION_SITES);
  }

  atEnergyCapcity() {
    return this.delegate.carry.energy >= this.delegate.carryCapacity;
  }

  energyDrained() {
    return this.delegate.carry.energy <= 0;
  }

}

module.exports = DecoratedCreep;
