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

  canCarryMoreEnergy() {
    return this.delegate.carry.energy >= this.delegate.carryCapacity;
  }
}

module.exports = DecoratedCreep;
