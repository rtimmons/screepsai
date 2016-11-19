var _ = require('underscore');

class Bus {
  constructor() {
    this.listeners = {
      '*': [],
    };
  }
  submit(topic, msg) {
    _.uniq(_.flatten([
      this.listeners[topic] || [],
      this.listeners['*']
    ])).forEach(i => i(msg));
  }
  listen(topic, callback) {
    this.listeners[topic] = this.listeners[topic] || [];
    this.listeners[topic].push(callback);
  }
}

module.exports = Bus;
