var creepProto = require('Creep.proto');
var roomProto  = require('Room.proto');
var roomPositionProto = require('RoomPosition.proto');
var towerProto = require('Tower.proto');

var memoryProto = require('Memory.proto');
var gameProto   = require('Game.proto');

var listeners = [
  require('ontick.clearMemory'),
  require('ontick.spawn'),
  require('ontick.controlCreeps'),
];

var Config = require('Config');
var TickContext = require('TickContext');

function loop() {

  Object.assign(Creep.prototype, creepProto);
  Object.assign(Room.prototype, roomProto);
  Object.assign(RoomPosition.prototype, roomPositionProto);
  Object.assign(StructureTower.prototype, towerProto);

  Object.assign(Memory, memoryProto);
  Object.assign(Game, gameProto);

  var context = new TickContext({
    time: Game.time,
  });
  var config = new Config(Memory);

  listeners.forEach(l => l.onTick(context, config));
}

module.exports.loop = loop;
