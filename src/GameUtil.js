const SPAWN_NAME = 'Spawn1';

module.exports = {
  extend: function (clz) {

    clz.energyReport = function () {
      var avail = Game.spawns[SPAWN_NAME].room.energyAvailable;
      var capacity = Game.spawns[SPAWN_NAME].room.energyCapacityAvailable;

      console.log(`Room has ${avail} available out of ${capacity}`);
    };

    clz.targetReport = function () {
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
    };

    clz.report = function () {
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
    };
  },
};
