module.exports = {

  controlTower(towerId) {
    // TODO: move somewhere else
    // TODO: repeat for all towers?
    var tower = Game.getObjectById(towerId);
    if (tower) {
      tower.onTick(Game.time);
    }
  },

  onTick(context, config) {

    // TODO: iterate over all towers
    var towerIds = config.get('towerIds');

    towerIds.forEach(id => this.controlTower(id));
  }
};
