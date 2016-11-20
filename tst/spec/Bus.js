var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var _ = require('underscore');

var Bus = require('../../src/Bus.js');

describe('Bus',() => {
  it('runs callbacks',() => {
    var bus = new Bus();
    var calls = { a:[], b:[], star:[] };
    bus.listen('a',msg => calls.a.push(msg));
    bus.listen('b',msg => calls.b.push(msg));
    bus.listen('*',msg => calls.star.push(msg));


    bus.submit('a',{t:1});
    bus.submit('b',{t:2});
    bus.submit('a',{t:3});
    bus.submit('*',{t:4});

    expect(calls).to.deep.equal(calls,{
      a:    [{t:1}, {t:3}],
      b:    [{t:2}],
      star: [{t:1}, {t:2}, {t:3}, {t:4}],
    });
  });
});