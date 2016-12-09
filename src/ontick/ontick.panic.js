module.exports = {

  onTick(context, config) {

    // see if we need to panic
    if (_.size(Game.creeps) <= 2) {
      Memory.panic = true;
      return;
    }

    // if not panic, then we're done
    if (!Memory.panic) {
      return;
    }

    // see if we can unpanic
    Game.eachSpawn(s => {
      var avail = s.room.energyAvailable;
      var capacity = s.room.energyCapacityAvailable;
      if (avail / capacity >= 0.8) {
        Memory.panic = false;
      }
    });
  },

};
