var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var _ = require('underscore');

var Deco = require('../../src/DecoratedCreep.js');

global.Memory = {
  targeting: {
    tower_1: {
      creep_7: 1,
    },
  },
};

describe('DecoratedCreep', () => {
  var mock = {
    id: 'creep_7',
    ticksToLive: 1,
    memory: {
      targetId: 'tower_1',
    },
  };
  it('clears out memory when ttl <= 1', () => {
    var deco = new Deco(mock);
    deco.tick(51059);

    expect(global.Memory).to.deep.equal({
      targeting: {},
    });
  });
});
