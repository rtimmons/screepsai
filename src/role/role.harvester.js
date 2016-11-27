if (typeof roleBuilder === 'undefined') {
  var roleBuilder = require('role.builder');
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (deco) {

        if (deco.modeIs('harvesting') && deco.atEnergyCapcity()) {
          deco.setMode('depositing');
        }

        if (!(deco.modeIs('harvesting') || deco.modeIs('depositing')) && deco.hasEnergyCapacity()) {
          deco.setMode('harvesting');
        }

        if (deco.energyDrained()) {
          deco.setMode('harvesting');
        }

        if (deco.modeIs('harvesting')) {
          deco.harvestFromBestSource();
        }

        if (deco.modeIs('depositing')) {
          if (!deco.depositToBestEnergyDeposit()) {
            roleBuilder.run(deco);
          }
        }
      },
  };
module.exports = roleHarvester;
