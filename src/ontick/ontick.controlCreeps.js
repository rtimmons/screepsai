var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleInfantry = require('role.infantry');

module.exports = {

  onTick(context) {
    Game.eachCreep(creep => {

      creep.tick(context.time());

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
    });
  },

};
