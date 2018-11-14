const db = require('./db')
const assert = require('assert')

run()
  .catch(err => console.error(err))

async function run() {
  await db.removeAll()

  {
    const all = await db.getAll()
    console.log('all', all)
    assert.equal(all.length, 0)
  }


  const created = await db.create({foo: 'bar'})
  console.log('created', created)
  assert.equal(created.foo, 'bar')


  const created1 = await db.create({index: 1})
  const created2 = await db.create({index: 2})

  {
    const all = await db.getAll()
    console.log('all (2)', all)
    assert.equal(all.length, 3)
  }

  {
    const got1 = await db.getOne(created1.id)
    console.log('got 1', got1)
    assert.ok(created1.id)
    assert.equal(got1.id, created1.id)
  }

  {
    const notFound = await db.getOne('bad-id')
    console.log('not found', notFound)
    assert.equal(notFound, undefined)
  }

  {
    const updated = await db.update({id: created1.id, prop: 'val'})
    console.log('updated', updated)
    assert.ok(updated.id)
    assert.equal(updated.id, created1.id)
    assert.equal(updated.index, undefined)
  }

  {
    const all = await db.getAll()
    assert.equal(all.length, 3)
  }

  {
    await db.remove(created1.id)
    const all = await db.getAll()
    assert.equal(all.length, 2)
    const allIds = all.map(({id}) => id)
    assert.deepEqual(allIds, [
      created.id,
      created2.id,
    ])
  }

  {
    await db.removeAll()
    const all = await db.getAll()
    assert.equal(all.length, 0)
  }
}
