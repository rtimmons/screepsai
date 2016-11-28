module.exports = {

  onCreepTick(creep, context, config) {

    if (!creep.roleIs('upgrader')) {
      return;
    }

    if (!creep.modeIs('harvesting') && creep.energyDrained()) {
      creep.setMode('harvesting');
    }

    if (!creep.modeIs('upgrading') && creep.atEnergyCapcity()) {
      creep.setMode('upgrading');
    }

    if (creep.modeIs('upgrading')) {
      creep.moveAndDo(creep.currentRoomController(), 'upgradeController');
    } else {
      creep.moveAndDo(creep.bestSource(), 'harvest');
    }
  },

};
