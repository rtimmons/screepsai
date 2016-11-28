class TickContext {

  constructor(data) {
    this.data = data;
  }

  time() {
    return this.data.time;
  }

};

module.exports = TickContext;
