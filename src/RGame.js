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
    var existing = _.filter(Game.creeps, (creep) => creep.memory.role == params.role);
    if(existing.length < params.atLeast) {
      var newName = Game.spawns[SPAWN_NAME].createCreep(
        params.bodyParts, 
        undefined,
        {role: params.role}
      );
      console.log('Created creep %j: %s', params, newName);
    }
  }
}

module.exports = RGame;