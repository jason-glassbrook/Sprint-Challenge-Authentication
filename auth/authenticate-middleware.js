/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = authenticate

/**************************************/

const jwt = require ('jsonwebtoken')
const { jwtSecret } = require ('../config/secrets.js')

const respondWithInvalidCredentials = require ('./respond-with-invalid-credentials')

/**************************************/

function authenticate (req, res, next) {

  const token = req.headers.authorization

  if (token) {

    jwt.verify (token, jwtSecret, (error, decrypted) => {

      if (error) {

        respondWithInvalidCredentials () (req, res)

      }
      else {

        req.user = {
          _id : decrypted.id,
          username : decrypted.id,
        }

        next ()

      }

    })

  }
  else {

    respondWithInvalidCredentials () (req, res)

  }

}
