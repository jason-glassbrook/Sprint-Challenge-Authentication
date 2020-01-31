const router = require ('express').Router ()

const bcrypt = require ('bcryptjs')
const signToken = require ('./signToken')

const respondWithError = require ('./respond-with-error')
const respondWithBadRequest = require ('./respond-with-bad-request')
const respondWithInvalidCredentials = require ('./respond-with-invalid-credentials')
const respondWithWelcome = require ('./respond-with-welcome')

const Users = require ('../users/users-model.js')

router.post ('/register', (req, res) => {

  // implement registration

  const { username, password } = req.body

  if (username && password) {

    const data = {
      username,
      hash : bcrypt.hashSync (password, 10)
    }

    Users.push (data)
    .then ((user) => {

      const token = signToken (user)
      respondWithWelcome ({
        _id : user._id,
        username : user.username,
      }, token) (req, res)

    })
    .catch ((error) => {

      respondWithError (error) (req, res)

    })

  }
  else {

    respondWithBadRequest () (req, res)

  }

  return

})

router.post ('/login', (req, res) => {

  // implement login

  const { username, password } = req.body

  if (username && password) {

    Users.findBy ({ username }, '*')
    .then (([ user ]) => {

      if (user && bcrypt.compareSync (password, user.hash)) {

        const token = signToken (user)
        respondWithWelcome ({
          _id : user._id,
          username : user.username,
        }, token) (req, res)

      }
      else {

        respondWithInvalidCredentials () (req, res)

      }

    })
    .catch ((error) => {

      respondWithError (error) (req, res)

    })

  }
  else {

    respondWithBadRequest () (req, res)

  }

  return

})

module.exports = router
