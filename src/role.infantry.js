var roleInfantry = {
  run: function (deco) {

    if (deco.attackBestEnemy()) {
      deco.setMode('attacking');
      return;
    }

    if (!deco.modeIs('harvesting') && deco.energyDrained()) {
      deco.setMode('harvesting');
    }

    if (!deco.modeIs('upgrading') && deco.atEnergyCapcity()) {
      deco.setMode('upgrading');
    }

    if (deco.modeIs('upgrading')) {
      deco.moveAndDo(deco.currentRoomController(), 'upgradeController');
    } else {
      deco.moveAndDo(deco.bestSource(), 'harvest');
    }
  },
};

module.exports = roleInfantry;
