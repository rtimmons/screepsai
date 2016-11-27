module.exports = {
  onTick(context, config) {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    // these are just cache-values so they shouldn't live too long anyway
    if (context.time() % config.get('targetingTtlTicks') == 0) {
      Memory.targeting = {};
    }
  }
};
