import { expect, default as chai } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

import NDMap from '../NDMap.js';

var NAME = 'testee';

describe('The constructor of NDMap', () => {
  it('does not throw and error for a dimension > 0', () => {
    expect(() => {
      const map = new NDMap(1);
    }).to.not.throw();
  });

  it('does throw and error for an invalid value for dimension', () => {
    expect(() => {
      const map = new NDMap(0);
    }).to.throw();
    expect(() => {
      const map = new NDMap(-1);
    }).to.throw();
    expect(() => {
      const map = new NDMap();
    }).to.throw();
  });
});

describe("NDMap's function", () => {
  describe('set()', () => {
    let testee = null;

    beforeEach(() => {
      testee = new NDMap(3);
    });

    it('does not throw and error for the correct number of keys', () => {
      expect(() => {
        const value = {};
        testee.set('a','b','c',value);
      }).to.not.throw();
    });

    it('does throw and error for an incorrect number of keys', () => {
      expect(() => {
        const value = {};
        testee.set('a','b',value);
      }).to.throw();
      expect(() => {
        const value = {};
        testee.set('a','b','c','d',value);
      }).to.throw();
    });

    it('stores the object', () => {
      const value = {};
      testee.set('a','b','c',value);
      const rootMap = testee._root;
      expect(rootMap).to.be.an.object;
      const mapDim1 = rootMap.get('a');
      expect(mapDim1).to.be.an.object;
      const mapDim2 = mapDim1.get('b');
      expect(mapDim2).to.be.an.object;
      const itemFound = mapDim2.get('c');
      expect(itemFound).to.equal(value);
    });
  });

  describe('has()', () => {
    let testee = null;

    beforeEach(() => {
      testee = new NDMap(3);
    });

    it('returns true when the item is found', () => {
      const value = {};
      testee.set('a','b','c',value);
      expect(testee.has('a','b','c')).to.be.true;
      expect(testee.has('a','b')).to.be.true;
    });

    it('returns false when the item is not found', () => {
      const value = {};
      testee.set('a','b','c',value);
      expect(testee.has('a','b','d')).to.be.false;
      expect(testee.has('a','d','c')).to.be.false;
      expect(testee.has('d','b','c')).to.be.false;
      expect(testee.has('d','b')).to.be.false;
    });

  });

  describe('get()', () => {
    let testee = null;

    beforeEach(() => {
      testee = new NDMap(3);
    });

    it('returns the correct item', () => {
      const value = {};
      testee.set('a','b','c',value);
      const itemFound = testee.get('a','b','c');
      expect(itemFound).to.equal(value);
    });

    it('returns undefined when not found', () => {
      const value = {};
      testee.set('a','b','c',value);
      expect(testee.get('a','b','d')).to.be.undefined;
      expect(testee.get('a','d')).to.be.undefined;
    });

  });

  describe('size', () => {
    it('returns the correct size', () => {
      const testee = new NDMap(3);
      testee.set('a','a','a', true);
      testee.set('a','a','b', true);
      testee.set('a','a','c', true);
      testee.set('a','a','d', true);
      testee.set('a','b','a', true);
      testee.set('a','b','b', true);
      testee.set('a','b','c', true);
      testee.set('a','b','d', true);
      testee.set('a','c','a', true);
      testee.set('a','c','b', true);
      testee.set('a','c','c', true);
      testee.set('a','c','d', true);

      // one extra, overwriting an existing entry
      testee.set('a','b','b', '');

      expect(testee.size).to.equal(12);
    });
  });

  describe('delete', () => {
    let testee = null;
    const value = {};

    beforeEach(() => {
      testee = new NDMap(3);
      testee.set('a','b','c',value);
    });

    it('does not throw and error for the correct number of keys', () => {
      expect(() => {
        testee.delete('a','b','c');
      }).to.not.throw();
    });

    it('does throw and error for an incorrect number of keys', () => {
      expect(() => {
        testee.delete('a','b');
      }).to.throw();
      expect(() => {
        testee.delete('a','b','c','d');
      }).to.throw();
    });

    it('removes the object', () => {
      testee.delete('a','b','c');
      const rootMap = testee._root;
      expect(rootMap).to.be.an.object;
      const mapDim1 = rootMap.get('a');
      expect(mapDim1).to.be.an.object;
      const mapDim2 = mapDim1.get('b');
      expect(mapDim2).to.be.an.object;
      const itemFound = mapDim2.get('c');
      expect(itemFound).to.be.undefined;
      expect(testee.size).to.equal(0);
    });
  });

});
