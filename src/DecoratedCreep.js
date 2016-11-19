class DecoratedCreep {
  constructor(delegate) {
    this.delegate = delegate;
  }
  role() {
    return this.delegate.memory.role;
  }
  mode() {
    return this.delegate.memory.mode;
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
