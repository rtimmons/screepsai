var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (deco) {

        if (deco.hasEnergyCapacity()) {
          deco.moveAndDo(deco.bestSource(), 'harvest');
        } else {
          var targets = deco.bestEnergyDeposit();
          if (targets.length > 0) {
            deco.unlessInRnage(targets[0],
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
