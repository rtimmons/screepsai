module.exports = {

  onCreepTick(creep, context, config) {

    if (!creep.roleIs('harvester')) {
      return;
    }

    if (creep.modeIs('harvesting') && creep.atEnergyCapcity()) {
      creep.setMode('depositing');
    }

    if (!(creep.modeIs('harvesting') || creep.modeIs('depositing')) && creep.hasEnergyCapacity()) {
      creep.setMode('harvesting');
    }

    if (creep.energyDrained()) {
      creep.setMode('harvesting');
    }

    if (creep.modeIs('harvesting')) {
      creep.harvestFromBestSource();
    }

    if (creep.modeIs('depositing')) {
      if (!creep.depositToBestEnergyDeposit()) {
        // TODO: roleBuilder.run(creep);
      }
    }
  },

};
