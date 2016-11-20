var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (deco) {

        // fill up
        if (deco.hasEnergyCapacity()) {
          deco.setMode('harvesting');
          deco.moveAndDo(deco.bestSource(), 'harvest');
        } else {
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
