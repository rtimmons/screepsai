module.exports = {

  onCreepTick(creep, context, config) {
    if (!creep.roleIs('builder')) {
      return;
    }

    if (creep.energyDrained()) {
      creep.setMode('harvesting');
    } else if (creep.modeIs('building')) {
      if (creep.energyDrained()) {
        creep.setMode('harvesting');
      }
    }

    if (creep.modeIs('harvesting') && creep.atEnergyCapcity()) {
      creep.setMode('constructing');
    }

    if (creep.modeIs('constructing')) {
      var target = creep.bestConstructionSite();
      if (target) {
        creep.moveAndDo(target, 'build');
      } else {
        creep.setMode('building');
      }
    } else if (creep.modeIs('harvesting')) {
      creep.harvestFromBestSource();
    } else if (creep.modeIs('building')) {
      creep.upgradeRoomController();
    } else { creep.setMode('harvesting'); }
  },

};
