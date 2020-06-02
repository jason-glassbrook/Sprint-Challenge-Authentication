const express = require ('express')

const authenticate = require ('../auth/authenticate-middleware.js')
const authRouter = require ('../auth/auth-router.js')
const jokesRouter = require ('../jokes/jokes-router.js')

const server = express ()

server.use ([
  require ('helmet') (),
  require ('cors') (),
  require ('morgan') ('dev'),
  express.json (),
])

server.use ('/api/auth', authRouter)
server.use ('/api/jokes', authenticate, jokesRouter)

module.exports = server
