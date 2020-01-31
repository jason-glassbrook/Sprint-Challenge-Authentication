const request = require ('supertest')
const server = require ('./server')
const db = require ('../database/dbConfig')

describe ('server', () => {

  /// STUFF HAPPENS AT ALL ///
  test (`runs tests`, () => {

    expect (true) .toBe (true)

  })

  /// CHECK SERVER ENVIRONMENT ///
  describe (`server environment`, () => {

    test (`needs to be testing`, () => {

      expect (process.env.SERVER_ENV) .toEqual ('testing')

    })

  })

  /// ONLY DO THIS IF IN TESTING MODE ///

  if (process.env.SERVER_ENV === 'testing') {

    const data = {
      'bad' : {
        'wrong' : `this isn't right`,
      },
      'good' : {
        'username' : `qwerty`,
        'password' : `qwerty123!`,
      },
    }

  }

})
