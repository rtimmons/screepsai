const SPAWN_NAME = 'Spawn1';

module.exports = {

  // http://support.screeps.com/hc/en-us/articles/205990342-StructureSpawn#createCreep
  // https://screeps.com/a/#!/sim/tutorial/4

  asBodyParts(m) {
    var out = [];
    for (var k in m) {
      var many = m[k];
      var toAdd = ({
        WORK: WORK,
        MOVE: MOVE,
        CARRY: CARRY,
        ATTACK: ATTACK,
      })[k];
      while(many > 0) {
        out.push(toAdd);
        many--;
      }
    }
    return out;
  },

  ensureCreepCount(budget, config, params) {
    if (budget < params.whenAvailable) {
      // console.log('Not enough energy to spawn ' + JSON.stringify(params));
      return;
    }

    var types = config.get('creepTypes');
    var type = types[params.key];
    if (!type) {
      console.log(`Unknown type ${type}. Maybe one of ${_.keys(types)}?`);
      return;
    }

    var existing = _.filter(Game.creeps, (creep) =>
      creep.memory.role == params.role &&
      creep.ticksToLive >= 300
    );

    if (existing.length < params.atLeast) {

      // TODO: add method to Game.spawn by type
      var newName = Game.spawns[SPAWN_NAME].createCreep(
        this.asBodyParts(type.parts),
        undefined,
        { role: type.role, level: type.level }
      );

      if (_.isString(newName)) {
        console.log('Spawned ' + type.role + ': ' + newName);

        // TODO: subtract by actual cost
        return budget - params.whenAvailable;
      }
    }
  },

  onTick(context, config) {

    var ensure = config.get('ensureCreeps');

    var budget = Game.spawns[SPAWN_NAME].room.energyAvailable;

    ensure.forEach((params) => {
      budget = this.ensureCreepCount(budget, config, params);
    });
  },

};
