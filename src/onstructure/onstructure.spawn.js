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
      while (many > 0) {
        out.push(toAdd);
        many--;
      }
    }

    return out;
  },

  ensureCreepCount(budget, spawn, config, params) {
    if (budget < params.whenAvailable) {
      // console.log('Not enough energy to spawn ' + JSON.stringify(params));
      return budget;
    }

    var types = config.get('creepTypes');
    var type = types[params.key];
    if (!type) {
      console.log(`Unknown type ${type}. Maybe one of ${_.keys(types)}?`);
      return budget;
    }

    var existing = _.filter(Game.creeps, (creep) =>
      creep.roleIs(type.role) && creep.ttl() >= 300
    );

    if (existing.length >= params.atLeast) {
      return budget;
    }

    // TODO: add method to Game.spawn by type
    var newName = spawn.createCreep(
      this.asBodyParts(type.parts),
      undefined,
      { role: type.role, level: type.level }
    );

    if (_.isString(newName)) {
      console.log('Spawned ' + type.role + ': ' + newName);

      // TODO: subtract by actual cost
      budget -= params.whenAvailable;
    }

    return budget;
  },

  onStructureTick(structure, context, config) {
    if (!structure.createCreep) {
      return;
    }

    var ensure = config.get('ensureCreeps');

    var budget = structure.room.energyAvailable;

    ensure.forEach((params) => {
      budget = this.ensureCreepCount(budget, structure, config, params);

      // console.log(`${JSON.stringify(params)} => ${budget}`);
    });
  },

};
