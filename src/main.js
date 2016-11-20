var RMain = require('RMain');
var GameUtil = require('GameUtil');

module.exports.loop = function () {

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
  };
