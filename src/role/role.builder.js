var roleBuilder = {

  run(deco) {
    if (deco.energyDrained()) {
      deco.setMode('harvesting');
    } else if (deco.modeIs('building')) {
      if (deco.energyDrained()) {
        deco.setMode('harvesting');
      }
    }

    if (deco.modeIs('harvesting') && deco.atEnergyCapcity()) {
      deco.setMode('constructing');
    }

    if (deco.modeIs('constructing')) {
      var target = deco.bestConstructionSite();
      if (target) {
        deco.moveAndDo(target, 'build');
      } else {
        deco.setMode('building');
      }
    } else if (deco.modeIs('harvesting')) {
      deco.harvestFromBestSource();
    } else if (deco.modeIs('building')) {
      deco.upgradeRoomController();
    } else { deco.setMode('harvesting'); }
  },
};

module.exports = roleBuilder;
