if (typeof Memory === 'undefined') {
  Memory = global.Memory;
  _ = require('underscore');
}

// The Screeps API is pretty low-level. This raises it up a notch

class DecoratedCreep {
  constructor(delegate) {
    this.delegate = delegate;
  }

  setRoleMode(role, mode) {
    return this.delegate.setRoleMode(role, mode);
  }

  ttl() {
    return this.delegate.ttl();
  }

  toString() {
    return this.delegate.toString();
  }

  getTargetingDescription() {
    return this.delegate.getTargetingDescription();
  }

  tick(time) {
    return this.delegate.tick();
  }

  getRole() {
    return this.delegate.getRole();
  }

  role() {
    return this.delegate.role();
  }

  setRole(role) {
    return this.delegate.setRole(role);
  }

  mode() {
    return this.delegate.mode();
  }

  getMode() {
    return this.delegate.getMode();
  }

  setMode(mode) {
    return this.delegate.setMode(mode);
  }

  modeIs(mode) {
    return this.delegate.modeIs(mode);
  }

  _targetingId(id) {
    return Memory.targetingId(id);
  }

  _clearTarget() {
    return this.delegate.clearTarget();
  }

  setTarget(target) {
    return this.delegate.setTarget(target);
  }

  getTargetId() {
    return this.delegate.getTargetId();
  }

  structuresWhere(predicate) {
    return this.delegate.room.structuresWhere(predicate);
  }

  // TODO: use .pos.closestStructureWhere directly
  closestStructureWhere(predicate) {
    return this.delegate.pos.closestStructureWhere(predicate);
  }

  unlessInRnage(target, onTarget) {
    var result = onTarget(this.delegate, target);
    if (result == ERR_NOT_IN_RANGE) {
      this.setTarget(target);
      this.delegate.moveTo(target);
    }
  }

  moveAndDo(target, action) {
    return this.delegate.moveAndDo(target, action);
  }

  inspect() {
    return this.delegate.inspect();
  }

  hasEnergyCapacity() {
    return this.delegate.hasEnergyCapacity();
  }

  currentRoomController() {
    return this.delegate.currentRoomController();
  }

  bestEnergyDeposit() {

    // we want to keep towers full first
    // TODO: maybe distinct role for tower harvesting?
    var tower = this.closestStructureWhere(s =>
      s.structureType == STRUCTURE_TOWER &&
      s.energy < s.energyCapacity / 2 && (
        _.size(this._targetingId(s.id)) == 0)
    );
    if (tower) {
      return tower;
    }

    var target = this.closestStructureWhere((structure) =>
        (structure.structureType == STRUCTURE_EXTENSION ||
         structure.structureType == STRUCTURE_SPAWN)
        && structure.energy < structure.energyCapacity
        && (
          _.size(this._targetingId(structure.id)) <=
           (structure.structureType == STRUCTURE_SPAWN) ? 3 : 1)
    );
    if (!target) {
      target = this.closestStructureWhere((structure) =>
        (structure.structureType == STRUCTURE_EXTENSION ||
         structure.structureType == STRUCTURE_SPAWN ||
         structure.structureType == STRUCTURE_TOWER)
        && structure.energy < structure.energyCapacity
      );
    }

    // TODO: else deposit into controller

    return target;
  }

  attackBestEnemy() {
    var target;

    // try setting to existing target, if any
    var existingTargetId = this.getTargetId();
    if (existingTargetId) {
      target = Game.getObjectById(existingTargetId);
      if (!target) {
        this._clearTarget();
        return false;
      }
    }

    // try finding hostile
    if (!target) {
      target = this.delegate.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (target) {
        this.setTarget(target);
      }
    }

    // no existing target, no hostile
    if (!target) {
      return false;
    }

    if (this.delegate.attack(target) == ERR_NOT_IN_RANGE) {
      this.delegate.moveTo(target);
    }

    return true;
  }

  depositToBestEnergyDeposit() {
    var existingTargetId = this.getTargetId();
    if (existingTargetId) {
      var target = Game.getObjectById(existingTargetId);
    }

    target = target || this.bestEnergyDeposit();

    if (target) {
      this.setTarget(target);
      this.unlessInRnage(target,
        (creep, target) => creep.transfer(target, RESOURCE_ENERGY)
      );
      this._clearTarget();
      return true;
    }

    return false;
  }

  bestSource() {
    var target = this.delegate.pos.findClosestByPath(
      FIND_SOURCES,
      { filter: s => s.energy > 0 && _.size(this._targetingId(s.id)) <= 3 }
    );

    if (target) { return target; }

    var orElse = this.delegate.pos.findClosestByPath(FIND_SOURCES,
      { filter: s => s.energy > 0 });
    if (orElse) { return orElse; }

    orElse = this.delegate.pos.findClosestByPath(FIND_SOURCES);
    return orElse;
  }

  harvestFromBestSource() {
    this.moveAndDo(this.bestSource(), 'harvest');
  }

  upgradeRoomController() {
    this.moveAndDo(this.delegate.room.controller, 'upgradeController');
  }

  bestConstructionSite() {
    return this.delegate.bestConstructionSite();
  }

  constructionSites() {
    return this.delegate.constructionSites();
  }

  atEnergyCapcity() {
    return this.delegate.atEnergyCapcity();
  }

  energyDrained() {
    return this.delegate.energyDrained();
  }

}

module.exports = DecoratedCreep;
