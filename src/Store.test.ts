import Store from './Store';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('All cases', () => {

  let db = new Store({ name: "test" });
  let domain = "hello.com",
    newDate = new Date(),
    expiry = (new Date()).getTime();

  newDate.setDate(newDate.getDate() + 90);

  it('insert', async () => {
    let item = await db.insert(domain, expiry);
    expect(item._id).to.equal(domain);
    expect(item.expiry).to.equal(expiry);
  });

  it('getAll', async () => {
    let items = await db.getExpiredDomainsByDate(expiry);
    expect(items.length).to.equal(1);
    let item = items[0];
    expect(item._id).to.equal(domain);
    expect(item.expiry).to.equal(expiry);
  })

  it('update', async () => {
    let item = await db.update(domain, { expiry: newDate.getTime() });
    expect(item._id).to.equal(domain);
    it(`has ${item.expiry}`, () => {
      expect(item.expiry).to.equal(newDate.getTime());
    })
  })


  it('get', async () => {
    let item = await db.get(domain);
    expect(item._id).to.equal(domain);
    it(`has ${item.expiry}`, () => {
      expect(item.expiry).to.equal(newDate.getTime());
    })
  })

  it('remove', async () => {
    await db.remove(domain);

    try {
      await db.get(domain);
      expect.fail("it find something");
    } catch (err) {
      expect(err.toString()).to.eq("Error: Unable to fetch domain");
    }
    
  })

  it('destroy', async () => {
    await db.destroy(true);
  })


});