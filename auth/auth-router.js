const router = require ('express').Router ()

const bcrypt = require ('bcryptjs')
const signToken = require ('./signToken')

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

  const { username, password } = req.body

  Users.findBy ({ username }, '*')
  .then (([ user ]) => {

    if (user && bcrypt.compareSync (password, user.hash)) {

      const token = signToken (user)

      res
      .status (200)
      .json ({
        message : `Welcome, ${user.username}. Take this.`,
        token,
      })

    }
    else {

      res
      .status (401)
      .json ({
        error : {
          message : `invalid credentials`,
        },
      })
    }

  })
  .catch ((error) => {

    res
    .status (500)
    .json (error)

  })

  return

})

module.exports = router
