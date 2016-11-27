const SPAWN_NAME = 'Spawn1';

module.exports = {
  energyReport() {
    var avail = Game.spawns[SPAWN_NAME].room.energyAvailable;
    var capacity = Game.spawns[SPAWN_NAME].room.energyCapacityAvailable;

    console.log(`Room has ${avail} available out of ${capacity}`);
  },

  targetReport() {
    var report = [];
    var structuresById = {};

    for (var k in Game.creeps) {
      var deco = Game.creeps[k];
      var targetId = deco.getTargetId();
      var str = `${k}(${deco.getRole()}/${deco.getMode()}!${deco.ttl()}) => `;
      if (targetId) {
        structuresById[targetId] =
          structuresById[targetId] ||
            Game.getObjectById(targetId);

        str += `${structuresById[targetId].structureType} (${targetId})`;
      }

      report.push(str);
    }

    console.log(report.join('\n'));
  },

  report() {
    var report = [];
    for (var k in Game.creeps) {
      var c = Game.creeps[k];
      report.push(JSON.stringify({
        role: c.memory.role,
        mode: c.memory.mode,
        level: c.memory.level,
        body: c.body.map(b => b.type.substring(0, 1)).sort().join(''),
        ttl: c.ticksToLive,
        name: c.name,
      }));
    }

    console.log(report.join('\n'));
  },



    // http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#createCreep
    // https://screeps.com/a/#!/sim/tutorial/4

    // this

  ensureCreepCount(params) {
    params.budget = params.budget ||
      Game.spawns[SPAWN_NAME].room.energyAvailable;

    if (params.budget < params.whenAvailable) {
      // console.log('Not enough energy to spawn ' + JSON.stringify(params));
      return;
    }

    // TODO: use deco here?
    var existing = _.filter(Game.creeps, (creep) =>
      creep.memory.role == params.role &&
      creep.ticksToLive >= 300
    );

    // console.log(`Wanted ${params.atLeast} ${params.role}s; have ${existing.length}`);
    if (existing.length < params.atLeast) {
      var newName = Game.spawns[SPAWN_NAME].createCreep(
        params.bodyParts,
        undefined,
        { role: params.role, level: params.level }
      );
      if (_.isString(newName)) {
        console.log('Spawned ' + params.role + ': ' + newName);

        // TODO: subtract by actual cost
        params.budget = params.budget - params.whenAvailable;
      }
    }
  },
};
