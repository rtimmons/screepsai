module.exports = {

  onCreepTick(deco, context, config) {

    if (!deco.roleIs('harvester')) {
      return;
    }

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
        // TODO: roleBuilder.run(deco);
      }
    }
  },

};
