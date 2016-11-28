module.exports = {

  onCreepTick(creep, context, config) {

    // we never get here with ticksToLive == 0
    if (creep.ticksToLive <= 1) {
      creep.clearTarget();
    }
  },

};
