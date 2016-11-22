var RMain = require('RMain');
var GameUtil = require('GameUtil');
var DecoratedCreep = require('DecoratedCreep');

deco = function (name) {
  return Game.creeps[name].deco();
};

module.exports.loop = function () {

    Creep.prototype.deco = function () {
      return new DecoratedCreep(this);
    };

    GameUtil.extend(Game);

    var rmain = new RMain({
      game: Game,
      memory: Memory,
    });
    rmain.tick();

    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    // these are just cache-values so they shouldn't live too long anyway
    if (Game.time % 750 == 0) {
      Memory.targeting = {};
    }
  };
