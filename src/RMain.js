var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleInfantry = require('role.infantry');

class RMain {
  constructor(params) {
    this.memory = params.memory;
    this.game   = params.game;
  }

  tick() {
    for (var name in this.game.creeps) {
      var creep = this.game.creeps[name];
      creep.tick(Game.time);

      if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      }

      if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      }

      if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      }

      if (creep.memory.role == 'infantry') {
        roleInfantry.run(creep);
      }
    }
  }
}

module.exports = RMain;
