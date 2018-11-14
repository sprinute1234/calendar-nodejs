const fs = require('fs')
const uuid = require('uuid/v1');

const FILE = __dirname + '/data.json'
const options = {encoding: 'utf8'}

const save = data => new Promise((resolve, reject) => {
  const json = JSON.stringify(data, false, '  ')
  fs.writeFile(FILE, json, options, err => {
    if (err) reject(err)
    else resolve()
  })
})

// Save whole data, but resolves only with
// the record at the specified _from the
// persisted data_.
const saveOne = (data, id) => {
  return save(data)
    .then(() => findRecord(data, id))
    .then(({record}) => {
      if (!record) {
        throw new Error('Failed to create record')
      }
      return record
    })
}

const read = () => new Promise((resolve, reject) => {
  fs.readFile(FILE, options, (err, contents) => {
    if (err) {
      reject(err)
    } else {
      const data = JSON.parse(contents)
      resolve(data)
    }
  })
})

/**
 * Get all records.
 *
 * db.getAll()
 *   .then(records => {...})
 *   .catch(err => {...})
 *
 * @return {Object[]}
 */
const getAll = () => new Promise((resolve, reject) => {
  fs.exists(FILE, exists => {
    if (exists) {
      read().then(resolve).catch(reject)
    } else {
      resolve([])
    }
  })
})

const findRecord = (data, id) => {
  const index = data
    .findIndex(({id: recordId}) => id === recordId)
  if (index === -1) {
    return {index, record: undefined}
  } else {
    const record = data[index]
    return {index, record}
  }
}

/**
 * Get one record by id.
 *
 * Returns `undefined` if the record is not found.
 *
 * const recordId = 1
 * db.getRecord(recordId)
 *   .then(record => {
 *     if (record) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {...})
 *
 * @param {string} id
 * @return {Object|undefined}
 */
const getOne = id => {
  return getAll()
    .then(data => {
      const {record} = findRecord(data, id)
      return record
    })
}

/**
 * Add a new record.
 *
 * Property `id` of the record will be
 * automatically generated. If an id is
 * already present in the provided record
 * data, it will be overwritten.
 *
 * Returns the newly created record data,
 * including the new id.
 *
 * db.create(recordData)
 *   .then(record => {
 *     const id = record.id
 *     // ...
 *   })
 *   .catch(err => {...})
 *
 * @param {Object} data
 * @return {Object} record
 * @return {string} record.id The new id
 */
const create = record => {
  return getAll()
    .then(data => {
      const id = uuid()
      const recordData = {id, ...record}
      data.push(recordData)
      return saveOne(data, id)
    })
}

/**
 * Update an existing record by completely
 * replacing it.
 *
 * The provided data **must** contains the
 * record's id (in property `id`).
 *
 * Returns the updated record, or throw an
 * Error if a record with the specified id
 * does not exist.
 *
 * db.update(recordData)
 *   .then(record => {
 *     // ...
 *   })
 *   .catch(err => {...})
 *
 * @param {Object} data
 * @return {Object} record
 */
const update = record => {
  const {id} = record
  return getAll()
    .then(data => {
      const {index} = findRecord(data, id)
      if (index !== -1) {
        data[index] = record
        return saveOne(data, id)
      } else {
        throw new Error(`Record not found (${id})`)
      }
    })
}

/**
 * Delete an existing record, based on its id.
 *
 * If the record is not found, this is a noop
 * (i.e. nothing will change, but the function
 * will not throw an Error).
 *
 * Returns undefined on success, or throw an
 * Error if fails to write new data to FS.
 *
 * db.remove(recordId)
 *   .then(() => {
 *     // ...
 *   })
 *   .catch(err => {...})
 *
 * @param {string} id
 * @return {undefined}
 */
const remove = id => {
  return getAll()
    .then(data => {
      const {index} = findRecord(data, id)
      if (index !== -1) {
        data.splice(index, 1)
      }
      return save(data)
    })
}

/**
 * Removes all records.
 *
 * Returns undefined on success, or throw an
 * Error if fails to write new data to FS.
 *
 * db.removeAll()
 *   .then(() => {
 *     // ...
 *   })
 *   .catch(err => {...})
 *
 * @return {undefined}
 */
const removeAll = () => save([])

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  removeAll,
}
