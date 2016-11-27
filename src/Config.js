const BASE = {
  targetingTtlTicks: 750,
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
