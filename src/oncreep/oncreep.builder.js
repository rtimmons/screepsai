module.exports = {

  onCreepTick(creep, context, config) {
    if (!creep.roleIs('builder')) {
      return;
    }

    if (creep.energyDrained()) {
      creep.setMode('harvesting');
    } else if (creep.modeIs('building') || creep.modeIs('upgrading')) {
      if (creep.energyDrained()) {
        creep.setMode('harvesting');
      }
    }

    if (creep.modeIs('harvesting') && creep.atEnergyCapcity()) {
      creep.setMode('constructing');
    }

    if (creep.modeIs('building')) {
      var target = creep.bestConstructionSite();
      if (target) {
        creep.moveAndDo(target, 'build');
      } else {
        creep.setMode('upgrading');
      }
    } else if (creep.modeIs('harvesting')) {
      creep.harvestFromBestSource();
    } else if (creep.modeIs('upgrading')) {
      creep.upgradeRoomController();
    }
    else {
      console.info(`Don't know how to handle ${creep} with mode ${creep.getMode()}`);
    }
  },

};
