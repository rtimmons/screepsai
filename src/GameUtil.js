var Deco = require('DecoratedCreep');

module.exports = {
  extend: function(clz) {
    clz.creep = function(creepName) {
      return new Deco(Game.creeps[creepName]);
    };
  }
};