/***************************************
  users model
***************************************/

module.exports = {
  find,
  findBy,
  push,
}

/**************************************/

const db = require ('../database/dbConfig.js')
const _public = [ '_id', 'username' ]

async function find (_select = _public) {
  const records = await (
    db ('users')
    .select (_select)
  )

  return records
}

async function findBy (_where, _select = _public) {
  const records = await (
    db ('users')
    .select (_select)
    .where (_where)
  )

  return records
}

async function push (data, _select = _public) {
  const [ _id ] = await (
    db ('users')
    .insert (data, [ '_id' ])
  )

  const [ record ] = await findBy ({ _id }, _select)

  return record
}
