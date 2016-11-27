if (typeof Memory === 'undefined') {
  Memory = global.Memory;
  _ = require('underscore');
}

// The Screeps API is pretty low-level. This raises it up a notch

class DecoratedCreep {
  constructor(delegate) {
    this.delegate = delegate;
  }

  bestEnergyDeposit() {
    return this.delegate.bestEnergyDeposit();
  }

  attackBestEnemy() {
    return this.delegate.attackBestEnemy();
  }

  depositToBestEnergyDeposit() {
    return this.delegate.depositToBestEnergyDeposit();
  }

  bestSource() {
    return this.delegate.bestSource();
  }

  harvestFromBestSource() {
    return this.delegate.harvestFromBestSource();
  }

  upgradeRoomController() {
    return this.delegate.upgradeRoomController();
  }

  // delegate-only methods

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

  _clearTarget() {
    return this.delegate.clearTarget();
  }

  setTarget(target) {
    return this.delegate.setTarget(target);
  }

  getTargetId() {
    return this.delegate.getTargetId();
  }

  unlessInRnage(target, onTarget) {
    return this.delegate.unlessInRange(target, onTarget);
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

}

module.exports = DecoratedCreep;
