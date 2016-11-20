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
  currentRoomController() {
    return this.delegate.room.controller;
  }
  bestSource() {
    // TODO: some way to find closest source?
    var candidates = this.delegate.room.find(FIND_SOURCES,{filter: s => s.energy > 50});
    var byId = _.sortBy(candidates, a => a.id)
    var out = byId.sort( (a,b) => a.energy - b.energy/100);
    return out[1];
  }
  constructionSites() {
    return this.delegate.room.find(FIND_CONSTRUCTION_SITES)
  }
  atEnergyCapcity() {
    return this.delegate.carry.energy >= this.delegate.carryCapacity;
  }
  energyDrained() {
    return this.delegate.carry.energy <= 0
  }

}

module.exports = DecoratedCreep;
