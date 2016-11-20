var Deco = require('DecoratedCreep');

module.exports = {
  extend: function(clz) {
    clz.creep = function(creepName) {
      return new Deco(Game.creeps[creepName]);
    };
    clz.report = function() {
      var report = [];
      for(var k in Game.creeps) {
        var c = Game.creeps[k];
        report.push(JSON.stringify({
          role: c.memory.role, mode: c.memory.mode, 
          body: c.body.map(b => b.type.substring(0,1)).sort().join(''), 
          name: c.name
        }));
      }
      console.log(report.join("\n"));
    };
  }
};