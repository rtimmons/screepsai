var RMain = require('RMain');
var GameUtil = require('GameUtil');

module.exports.loop = function () {

    GameUtil.extend(Game);

    var rmain = new RMain({
      game: Game,
      memory: Memory
    });
    rmain.tick();
}