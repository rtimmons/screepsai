module.exports = {
  controlTower(towerId) {
    // TODO: move somewhere else
    // TODO: repeat for all towers?
    var tower = this.game.getObjectById(towerId);
    if (tower) {
      tower.onTick(Game.time);
    }
  },

  onTick(context, config) {
    this.controlTower('583276ecf3a0a9785e5e5fa3');
    this.controlTower('58370345a19b6bfd464d5f97');
  }
};
