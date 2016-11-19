// The Screeps API is pretty low-level. This raises it up a notch
class DecoratedCreep {
  constructor(delegate) {
    this.delegate = delegate;
  }
  role() {
    return this.delegate.memory.role;
  }
  setRole(role) {
    this.delegate.memory.role = role;
  }
  mode() {
    return this.delegate.memory.mode;
  }

  structuresWhere(predicate) {
    return this.delegate.room.find(FIND_STRUCTURES, {filter: predicate});
  }

  unlessInRnage(target, onTarget) {
    var result = onTarget(this.delegate, target);
    if(result == ERR_NOT_IN_RANGE) {
      this.delegate.moveTo(target);
    }
  }

  moveAndDo(target, action) {
    if(this.delegate[action](target) == ERR_NOT_IN_RANGE) {
        this.delegate.moveTo(target);
    }
  }
  inspect() {
    return JSON.stringify(this.delegate.memory);
  }
  hasEnergyCapacity() {
    return this.delegate.carry.energy < this.delegate.carryCapacity
  }
  atEnergyCapcity() {
    return this.delegate.carry.energy >= this.delegate.carryCapacity;
  }
  energyDrained() {
    return this.delegate.carry.energy == 0
  }
  getMode() {
    return this.delegate.memory.mode;
  }
  setMode(mode) {
    this.delegate.memory.mode = mode;
  }
  modeIs(mode) {
    return this.delegate.memory.mode == mode;
  }
}

module.exports = DecoratedCreep;
