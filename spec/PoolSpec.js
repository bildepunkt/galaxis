import Pool from "../src/Pool";

describe("Pool", ()=> {
    let itemA = { uid: 0 };
    let itemB = { uid: 1 };
    let itemC = { uid: 2 };
    let pool;

    beforeEach(()=> {
        pool = new Pool();
    });

    it("adds one item", ()=> {
        pool.add(itemA);

        expect(pool.items[0]).toEqual(itemA);
    });

    it("adds one item at the given index", ()=> {
        pool.add(itemA, itemA, itemA);

        pool.addAt(1, itemB);

        expect(pool.getCount()).toEqual(4);
        expect(pool.fetchAt(1)).toEqual(itemB);
    });

    it("iterates over items", ()=> {
        pool.add(itemA, itemB, itemC);
        let iteratees = [];

        pool.each((item, index)=> {
            iteratees.push({
                item, index
            });
        });

        expect(iteratees).toEqual([
            {
                item: itemA,
                index: 0
            }, {
                item: itemB,
                index: 1
            }, {
                item: itemC,
                index: 2
            }
        ]);
    });

    it("breaks on iteration if fn returns false", ()=> {
        pool.add(itemA, itemB, itemC);
        let iteratees = [];

        pool.each((item, index)=> {
            if (index > 0) {
                return false;
            }

            iteratees.push({
                item, index
            });
        });

        expect(iteratees).toEqual([
            {
                item: itemA,
                index: 0
            }
        ]);
    });

    it("fetches an item at given index", ()=> {
        pool.add(itemA, itemB, itemA);

        expect(pool.fetchAt(1)).toEqual(itemB);
    });

    it("filters items", ()=> {
        pool.add(itemA, itemA, itemA, itemB, itemA, itemB);
        
        let bItems = pool.filter((item)=> {
            return item.uid === 1;
        });

        expect(bItems).toEqual([itemB, itemB]);
    });

    it("returns correct count", ()=> {
        pool.add(itemA);
        expect(pool.getCount()).toEqual(1);
        pool.add(itemA);
        expect(pool.getCount()).toEqual(2);
        pool.add(itemA);
        expect(pool.getCount()).toEqual(3);
    });

    it("returns index of item", ()=> {
        pool.add(itemA, itemA, itemA, itemC, itemA, itemB);

        expect(pool.getIndex(itemC)).toEqual(3);
        expect(pool.getIndex(itemB)).toEqual(5);
    });

    it("returns if item is at front (last in list)", ()=> {
        pool.add(itemA, itemB, itemC);

        expect(pool.isAtFront(itemC)).toBe(true);
        expect(pool.isAtFront(itemB)).toBe(false);
        expect(pool.isAtFront(itemA)).toBe(false);
    });

    it("returns if item is at back (first in list)", ()=> {
        pool.add(itemA, itemB, itemC);

        expect(pool.isAtBack(itemA)).toBe(true);
        expect(pool.isAtBack(itemB)).toBe(false);
        expect(pool.isAtBack(itemC)).toBe(false);
    });

    it("moves an item", ()=> {
        pool.add(itemA, itemB, itemC);

        pool.move(itemA, 1);
        expect(pool.fetchAt(0)).toEqual(itemB);
        expect(pool.fetchAt(1)).toEqual(itemA);
        expect(pool.fetchAt(2)).toEqual(itemC);

        pool.move(itemC, -2);
        expect(pool.fetchAt(0)).toEqual(itemC);
        expect(pool.fetchAt(1)).toEqual(itemB);
        expect(pool.fetchAt(2)).toEqual(itemA);
    });

    it("moves an item to the front (last index)", ()=> {
        pool.add(itemA, itemB, itemC);

        pool.moveToFront(itemA);
        expect(pool.fetchAt(0)).toEqual(itemB);
        expect(pool.fetchAt(1)).toEqual(itemC);
        expect(pool.fetchAt(2)).toEqual(itemA);
    });

    it("moves an item to the back (first index)", ()=> {
        pool.add(itemA, itemB, itemC);

        pool.moveToBack(itemC);
        expect(pool.fetchAt(0)).toEqual(itemC);
        expect(pool.fetchAt(1)).toEqual(itemA);
        expect(pool.fetchAt(2)).toEqual(itemB);
    });

    it("removes an item", ()=> {
        pool.add(itemA, itemB, itemC);

        pool.remove(itemB);
        expect(pool.getCount()).toEqual(2);
        expect(pool.fetchAt(0)).toEqual(itemA);
        expect(pool.fetchAt(1)).toEqual(itemC);
    });

    it("removes all items", ()=> {
        pool.add(itemA, itemB, itemC);

        expect(pool.getCount()).toEqual(3);
        pool.removeAll();
        expect(pool.getCount()).toEqual(0);
    });

    it("removes an item at given index", ()=> {
        pool.add(itemA, itemB, itemC);

        pool.removeAt(1);
        expect(pool.getCount()).toEqual(2);
        expect(pool.fetchAt(0)).toEqual(itemA);
        expect(pool.fetchAt(1)).toEqual(itemC);
    });
});