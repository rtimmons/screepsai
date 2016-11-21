const SPAWN_NAME = 'Spawn1';

class RGame {
  /*
  {
    role: 'harvester',
    atLeast: 2,
    bodyParts: [WORK,CARRY,MOVE]
  }
  */

  // http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#createCreep
  // https://screeps.com/a/#!/sim/tutorial/4

  ensureCreepCount(params) {
    if (Game.spawns[SPAWN_NAME].room.energyAvailable < params.whenAvailable) {
      // console.log('Not enough energy to spawn ' + JSON.stringify(params));
      return;
    }

    whenAvailable: 550;
    var existing = _.filter(Game.creeps, (creep) => creep.memory.role == params.role);

    // console.log(`Wanted ${params.atLeast} ${params.role}s; have ${existing.length}`);
    if (existing.length < params.atLeast) {
      var newName = Game.spawns[SPAWN_NAME].createCreep(
        params.bodyParts,
        undefined,
        { role: params.role }
      );
      if (_.isString(newName)) {
        console.log('Spawned ' + params.role + ': ' + newName);
      }
    }
  }
}

module.exports = RGame;
