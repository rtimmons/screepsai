var creepProto = require('Creep.proto');
var roomProto  = require('Room.proto');
var roomPositionProto = require('RoomPosition.proto');
var towerProto = require('Tower.proto');

var memoryProto = require('Memory.proto');
var gameProto   = require('Game.proto');

var RMain = require('RMain');

module.exports.loop = function () {

    Object.assign(Creep.prototype, creepProto);
    Object.assign(Room.prototype, roomProto);
    Object.assign(RoomPosition.prototype, roomPositionProto);
    Object.assign(StructureTower.prototype, towerProto);

    Object.assign(Memory, memoryProto);
    Object.assign(Game, gameProto);

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
