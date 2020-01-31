const router = require ('express').Router ()

const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const { jwtSecret } = require ('../config/secrets.js')

const Users = require ('../users/users-model.js')

router.post ('/register', (req, res) => {

  // implement registration

  const { username, password } = req.body

  const user = {
    username,
    hash : bcrypt.hashSync (password, 10)
  }

  Users.push (user)
  .then ((record) => {

    res
    .status (201)
    .json (record)

  })
  .catch ((error) => {

    res
    .status (500)
    .json (error)

  })

  return

})

router.post ('/login', (req, res) => {

  // implement login

  return

})

module.exports = router
