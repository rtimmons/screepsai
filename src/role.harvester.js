var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (deco) {

        if (deco.hasEnergyCapacity()) {
          deco.moveAndDo(deco.bestSource(), 'harvest');
        } else {
          var targets = deco.structuresWhere((structure) =>
              (structure.structureType == STRUCTURE_EXTENSION ||
               structure.structure     == STRUCTURE_CONTROLLER ||
               structure.structureType == STRUCTURE_SPAWN ||
               structure.structureType == STRUCTURE_TOWER)
              && structure.energy < structure.energyCapacity
          );
          if (targets.length > 0) {
            deco.unlessInRnage(targets[0],
                (creep, target) => creep.transfer(target, RESOURCE_ENERGY)
            );
          }

          // else {
          //     deco.setRole('builder');
          // }
        }
      },
  };

module.exports = roleHarvester;
