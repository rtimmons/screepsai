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
    this.setRole(role);
    this.setMode(mode);
    this.delegate.say(`${role}/${mode}`);
  }

  ttl() {
    return this.delegate.ticksToLive;
  }

  toString() {
    return `${this.getRole()}/${this.getMode()}!${this.ttl()} -> ${this.getTargetingDescription()}`;
  }

  getTargetingDescription() {
    var targetId = this.getTargetId();
    if (!targetId) { return 'none'; }

    var target = Game.getObjectById(targetId);
    if (!target) { return '<dne>'; }

    return `${target.structureType} (${targetId})`;
  }

  tick(time) {

    // we never get here with ticksToLive == 0
    if (this.delegate.ticksToLive <= 1) {
      this._clearTarget();
    }
  }

  getRole() {
    return this.delegate.getRole();
  }

  role() {
    return this.delegate.role();
  }

  setRole(role) {
    if (this.delegate.memory.role == role) {
      return;
    }

    this._clearTarget();
    this.delegate.memory.role = role;
    this.delegate.say(role);
  }

  mode() {
    return this.delegate.mode();
  }

  getMode() {
    return this.delegate.getMode();
  }

  setMode(mode) {
    if (this.delegate.memory.mode == mode) {
      return;
    }

    this._clearTarget();
    this.delegate.memory.mode = mode;
    this.delegate.say(mode);
  }

  modeIs(mode) {
    return this.delegate.modeIs(mode);
  }

  _targetingId(id) {
    Memory.targeting = Memory.targeting || {};
    Memory.targeting[id] = Memory.targeting[id] || {};
    return Memory.targeting[id];
  }

  _clearTarget() {

    // who I'm targeting
    var targetId = this.delegate.memory.targetId;

    // others also targeting targetId
    var targeting = this._targetingId(targetId);

    delete targeting[this.delegate.id];
    if (_.size(Memory.targeting[targetId]) == 0) {
      delete Memory.targeting[targetId];
    }

    delete this.delegate.memory.targetId;
  }

  setTarget(target) {
    // console.log(`${this.delegate.name} setting target to ${target.structureType}`);
    this._clearTarget();
    this.delegate.memory.targetId = target.id;

    this._targetingId(target.id)[this.delegate.id] = 1;
  }

  getTargetId() {
    return this.delegate.memory.targetId;
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
    var out = this.delegate[action](target);

    if (out == ERR_NOT_IN_RANGE || out == ERR_NOT_ENOUGH_ENERGY) {
      this.setTarget(target);
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
