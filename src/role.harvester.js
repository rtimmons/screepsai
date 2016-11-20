var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (deco) {

        if (deco.hasEnergyCapacity()) {
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

          // else {
          //     deco.setRole('builder');
          // }
        }
      },
  };

module.exports = roleHarvester;
