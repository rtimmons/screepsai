var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (deco) {

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
          var targets = deco.constructionSites();
          if (targets.length) {
            deco.moveAndDo(targets[0], 'build');
          } else {
            deco.setMode('building');
          }
        } else if (deco.modeIs('harvesting')) {
          deco.moveAndDo(deco.bestSource(), 'harvest');
        } else if (deco.modeIs('building')) {
          deco.moveAndDo(creep.room.controller, 'upgradeController');
        } else { deco.setMode('harvesting'); }
      },
  };

module.exports = roleBuilder;
