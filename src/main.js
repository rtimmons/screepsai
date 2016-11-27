var creepProto = require('Creep.proto');
var roomProto  = require('Room.proto');
var roomPositionProto = require('RoomPosition.proto');
var towerProto = require('Tower.proto');

var memoryProto = require('Memory.proto');
var gameProto   = require('Game.proto');

var onTicks = [
  require('ontick.clearMemory'),
  require('ontick.spawn'),
  require('ontick.controlTowers'),
];

var onCreeps = [
  require('oncreep.builder'),
  require('oncreep.harvester'),
  require('oncreep.infantry'),
  require('oncreep.upgrader'),
];

var Config = require('Config').class;
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

  Game.eachCreep(creep => {

    // TODO: should use name onTick
    // TODO: be consistent with (context, config) params
    creep.tick(Game.time);

    onCreeps.forEach(handler => handler.onCreep(creep))
  });

  onTicks.forEach(l => l.onTick(context, config));
}

module.exports.loop = loop;
