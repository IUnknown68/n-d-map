import { expect, default as chai } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

/**
 * For the order of these test-entries see documentation.
 */
const testData = [
  [['a','a','a'], 0],
  [['a','a','b'], 1],
  [['a','a','c'], 2],
  [['a','a','d'], 3],
  [['a','b','a'], 4],
  [['a','b','b'], 5],
  [['a','b','c'], 6],
  [['a','b','d'], 7],
  [['a','c','a'], 8],
  [['a','c','b'], 9],
  [['a','c','c'], 10],
  [['a','c','d'], 11]
];

//------------------------------------------------------------------------------
function addTestData(testee) {
  testData.forEach(entry => {
    const args = entry[0].slice(0);
    args.push(entry[1]);
    testee.set.apply(testee, args);
  });
}

//------------------------------------------------------------------------------
function testThrowNotthrow(notthrowing, throwingLt, throwingGt) {
  it('does not throw an error for the correct number of keys', () => {
    expect(() => {
      notthrowing();
    }).to.not.throw();
  });

  it('does throw an error for an incorrect number of keys', () => {
    expect(() => {
      throwingLt();
    }).to.throw();
    expect(() => {
      throwingGt();
    }).to.throw();
  });
}

//==============================================================================
// test runner. Runs everything on `MapClass`.
export default (MapClass, name) => {
  describe(`${name}'s`, () => {
    //--------------------------------------------------------------------------
    describe(`constructor`, () => {
      it('does not throw an error for a dimension > 0', () => {
        expect(() => {
          const map = new MapClass(1);
        }).to.not.throw();
      });

      it('does throw an error for 0 dimensions', () => {
        expect(() => {
          const map = new MapClass(0);
        }).to.throw();
      });

      it('does throw an error for negative dimensions', () => {
        expect(() => {
          const map = new MapClass(-1);
        }).to.throw();
      });

      it('does throw an error for missing dimensions', () => {
        expect(() => {
          const map = new MapClass();
        }).to.throw();
      });
    });

    //--------------------------------------------------------------------------
    describe('property', () => {
      describe('size', () => {
        it('returns the correct size', () => {
          const testee = new MapClass(3);
          addTestData(testee);
          expect(testee.size).to.equal(testData.length);
        });
      });
    });

    //--------------------------------------------------------------------------
    describe('method', () => {
      describe('delete()', () => {
        let testee = null;
        const value = {};

        beforeEach(() => {
          testee = new MapClass(3);
          testee.set('a','b','c',value);
        });

        testThrowNotthrow(() => {
          testee.delete('a','b','c');
        }, () => {
          testee.delete('a','b');
        }, () => {
          testee.delete('a','b','c','d');
        });

        it('removes the item', () => {
          testee.delete('a','b','c');
          expect(testee.get('a','b','c')).to.be.undefined;
        });
      });

      describe('get()', () => {
        let testee = null;

        beforeEach(() => {
          testee = new MapClass(3);
        });

        testThrowNotthrow(() => {
          testee.get('a','b','c');
        }, () => {
          testee.get('a','b');
        }, () => {
          testee.get('a','b','c','d');
        });

        it('returns the correct item', () => {
          const entry = testData[4];
          addTestData(testee);
          const itemFound = testee.get.apply(testee, entry[0]);
          expect(itemFound).to.equal(entry[1]);
        });

        it('returns undefined when not found', () => {
          const value = {};
          testee.set('a','b','c',value);
          expect(testee.get('a','b','d')).to.be.undefined;
        });
      });

      describe('set()', () => {
        let testee = null;

        beforeEach(() => {
          testee = new MapClass(3);
        });

        testThrowNotthrow(() => {
          const value = {};
          testee.set('a','b','c',value);
        }, () => {
          const value = {};
          testee.set('a','b',value);
        }, () => {
          const value = {};
          testee.set('a','b','c','d',value);
        });

        it('stores the object', () => {
          const value = {};
          testee.set('a','b','c',value);
          expect(testee.get('a','b','c')).to.equal(value);
        });
      });

      describe('has()', () => {
        let testee = null;

        beforeEach(() => {
          testee = new MapClass(3);
        });

        testThrowNotthrow(() => {
          testee.has('a','b','c');
        }, () => {
          testee.has('a','b');
        }, () => {
          testee.has('a','b','c','d');
        });

        it('returns true when the item is found', () => {
          const value = {};
          testee.set('a','b','c',value);
          expect(testee.has('a','b','c')).to.be.true;
        });

        it('returns false when the item is not found', () => {
          const value = {};
          testee.set('a','b','c',value);
          expect(testee.has('a','b','d')).to.be.false;
          expect(testee.has('a','d','c')).to.be.false;
          expect(testee.has('d','b','c')).to.be.false;
        });
      });

      describe('forEach()', () => {
        let testee = null;

        beforeEach(() => {
          testee = new MapClass(3);
          addTestData(testee);
        });

        it('calls the callback once for each value with correct values and in the correct order', () => {
          let n = 0;
          testee.forEach((val, keys) => {
            expect(val).to.eql(testData[n][1]);
            expect(keys).to.eql(testData[n][0]);
            ++n;
          });
          expect(n).to.equal(testData.length);
        });
      });
    });

    //--------------------------------------------------------------------------
    describe('iterator', () => {
      let testee = null;
      beforeEach(() => {
        testee = new MapClass(3);
        addTestData(testee);
      });

      describe('keys()', () => {
        it('delivers all keys in the correct order', () => {
          let n = 0;
          for (let val of testee.keys()) {
            expect(val).to.eql(testData[n][0]);
            ++n;
          }
          expect(n).to.equal(testData.length);
        });

        it('is a well-formed iterable', () => {
          const iter = testee.keys();
          expect(iter[Symbol.iterator]()).to.eql(iter);
        });
      });

      describe('values()', () => {
        it('values() delivers all values in the correct order', () => {
          let n = 0;
          for (let val of testee.values()) {
            expect(val).to.eql(testData[n][1]);
            ++n;
          }
          expect(n).to.equal(testData.length);
        });

        it('is a well-formed iterable', () => {
          const iter = testee.values();
          expect(iter[Symbol.iterator]()).to.eql(iter);
        });
      });

      describe('entries()', () => {
        it('delivers all entries in the correct order', () => {
          let n = 0;
          for (let val of testee.entries()) {
            expect(val).to.eql(testData[n]);
            ++n;
          }
          expect(n).to.equal(testData.length);
        });

        it('is a well-formed iterable', () => {
          const iter = testee.entries();
          expect(iter[Symbol.iterator]()).to.eql(iter);
        });
      });

      describe('itself', () => {
        it('delivers all entries in the correct order', () => {
          let n = 0;
          for (let val of testee) {
            expect(val).to.eql(testData[n]);
            ++n;
          }
          expect(n).to.equal(testData.length);
        });

        it('is a well-formed iterable', () => {
          const iter = testee[Symbol.iterator]();
          expect(iter[Symbol.iterator]()).to.eql(iter);
        });
      });
    });
  });
};
