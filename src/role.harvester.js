var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (deco) {

        if (deco.modeIs('harvesting') && deco.atEnergyCapcity()) {
          deco.setMode('depositing');
        }

        if (!deco.modeIs('harvesting') && deco.hasEnergyCapacity()) {
          deco.setMode('harvesting');
        }

        if (deco.energyDrained()) {
          deco.setMode('harvesting');
        }

        if (deco.modeIs('harvesting')) {
          deco.harvestFromBestSource();
        }

        if (deco.modeIs('depositing')) {
          var target = deco.bestEnergyDeposit();
          if (target) {
            deco.unlessInRnage(target,
              (creep, target) => creep.transfer(target, RESOURCE_ENERGY)
            );
          } else {
            roleBuilder.run(deco);
          }
        }
      },
  };
module.exports = roleHarvester;
