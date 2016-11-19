var RMain = require('RMain');

module.exports.loop = function () {
    var rmain = new RMain({
      game: Game,
      memory: Memory
    });
    rmain.tick();
}