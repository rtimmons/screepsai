module.exports = {
  eachCreep(onCreep) {
    var out = [];
    for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      var result = onCreep(creep, name);
      out.push(result);
    }
    return out;
  },

  eachSpawn(onSpawn) {
    var out = [];
    for(var name in Game.spawns) {
      var spawn = Game.spawns[name];
      var result = onSpawn(spawn);
      out.push(result);
    }
    return out;
  },

  eachStructure(onStructure) {
    var out = [];
    for(var name in Game.structures) {
      var structure = Game.structures[name];
      var result = onStructure(structure);
      out.push(result);
    }
    return out;
  },

  energyReport() {
    var report = Game.eachSpawn(s => {
      var avail = s.room.energyAvailable;
      var capacity = s.room.energyCapacityAvailable;
      return `Spawn ${s.name}: room ${s.room.name} has ${avail} available out of ${capacity}`;
    })


    console.log(report.join('\n'));
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
};
