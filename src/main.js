var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    // https://screeps.com/a/#!/sim/tutorial/4
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if(harvesters.length < 2) {
      var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined,
        {role: 'harvester'});
      console.log('Spawning new harvester: ' + newName);
    }

    // http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#createCreep

    // https://screeps.com/a/#!/sim/tutorial/4
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    if(builders.length < 2) {
      var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined,
        {role: 'builder'});
      console.log('Spawning new builder: ' + newName);
    }

    // https://screeps.com/a/#!/sim/tutorial/4
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    if(upgraders.length < 2) {
      var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined,
        {role: 'upgrader'});
      console.log('Spawning new upgrader: ' + newName);
    }

    // To kill: Game.creeps['Harvester1'].suicide()
    // Also: StructureSpawn.renewCreep - http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#renewCreep


    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}