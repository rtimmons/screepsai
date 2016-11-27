const BASE = {

  targetingTtlTicks: 750,

  towerIds: [
    '583276ecf3a0a9785e5e5fa3',
    '58370345a19b6bfd464d5f97',
  ],
};

class Config {
  constructor(memory) {
    this.memory = memory;
    this.memory.config = this.memory.config || {};
  }

  get(key) {
    return this.memory.config[key] || BASE[key];
  }
}

module.exports = Config;
