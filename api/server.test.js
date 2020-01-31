const request = require ('supertest')
const server = require ('./server')
const db = require ('../database/dbConfig')

describe ('server', () => {

  /// STUFF HAPPENS AT ALL ///
  test (`runs tests`, () => {

    expect (true).toBe (true)

  })

  /// CHECK SERVER ENVIRONMENT ///
  describe (`server environment`, () => {

    test (`needs to be testing`, () => {

      expect (process.env.SERVER_ENV).toEqual ('testing')

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

    /***************************************
      USER REGISTRATION
    ***************************************/

    describe ('POST /api/auth/register', async () => {

      beforeEach (async () => {
        await db ('users').truncate ()
      })

      afterAll (async () => {
        await db ('users').truncate ()
      })

      /// BAD REQUESTS ARE BAD? ///

      describe (`what happens when request does not have username, password`, async () => {

        /// STATUS CODE? ///

        test (`responds with 400 BAD REQUEST`, async () => {

          return (
            await request (server)
            .post ('/api/auth/register')
            .send (data.bad)
            .then ((re) => {
              expect (re.status) .toEqual (400)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, async () => {

          return (
            await request (server)
            .post ('/api/auth/register')
            .send (data.bad)
            .then ((re) => {
              expect (re.type).toMatch (/json/i)
            })
          )

        })

      })

      /// GOOD REQUESTS ARE GOOD? ///

      describe (`what happens when request has username, password`, async () => {

        /// STATUS CODE? ///

        test (`responds with 200 OK`, async () => {

          return (
            await request (server)
            .post ('/api/auth/register')
            .send (data.good)
            .then ((re) => {
              expect (re.status) .toEqual (200)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, async () => {

          return (
            await request (server)
            .post ('/api/auth/register')
            .send (data.good)
            .then ((re) => {
              expect (re.type).toMatch (/json/i)
            })
          )

        })

      })

    })

    /***************************************
      USER LOGIN
    ***************************************/

    describe ('POST /api/auth/login', async () => {

      beforeAll (async () => {
        await db ('users').truncate ()

        await request (server)
        .post ('/api/auth/register')
        .send (data.good)
        .then ((re) => {
          console.log (re.status)
          console.log (re.body)
        })
      })

      afterAll (async () => {
        await db ('users').truncate ()
      })

      /// BAD REQUESTS ARE BAD? ///

      describe (`what happens when request does not have username, password`, async () => {

        /// STATUS CODE? ///

        test (`responds with 400 BAD REQUEST`, async () => {

          return (
            await request (server)
            .post ('/api/auth/login')
            .send (data.bad)
            .then ((re) => {
              expect (re.status) .toEqual (400)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, async () => {

          return (
            await request (server)
            .post ('/api/auth/login')
            .send (data.bad)
            .then ((re) => {
              expect (re.type).toMatch (/json/i)
            })
          )

        })

      })

      /// GOOD REQUESTS ARE GOOD? ///

      describe (`what happens when request has username, password`, async () => {

        /// STATUS CODE? ///

        test (`responds with 200 OK`, async () => {

          return (
            await request (server)
            .post ('/api/auth/login')
            .send (data.good)
            .then ((re) => {
              expect (re.status) .toEqual (200)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, async () => {

          return (
            await request (server)
            .post ('/api/auth/login')
            .send (data.good)
            .then ((re) => {
              expect (re.type).toMatch (/json/i)
            })
          )

        })

      })

    })

    /***************************************
      JOKES
    ***************************************/

    describe ('GET /api/jokes', async () => {

      let token

      beforeAll (async () => {
        await db ('users').truncate ()

        await request (server)
        .post ('/api/auth/register')
        .send (data.good)
        .then ((re) => {
          console.log (re.status)
          console.log (re.body)
        })
      })

      afterAll (async () => {
        await db ('users').truncate ()
      })

      /// BAD REQUESTS ARE BAD? ///

      describe (`what happens when request does not have headers.authorization`, async () => {

        /// STATUS CODE? ///

        test (`responds with 401 INVALID CREDENTIALS`, async () => {

          return (
            await request (server)
            .get ('/api/jokes')
            .send ()
            .then ((re) => {
              expect (re.status) .toEqual (401)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, async () => {

          return (
            await request (server)
            .get ('/api/jokes')
            .send ()
            .then ((res) => {
              expect (res.type).toMatch (/json/i)
            })
          )

        })

      })

      /// GOOD REQUESTS ARE GOOD? ///

      describe (`what happens when request has username, password`, async () => {

        /// STATUS CODE? ///

        test (`responds with 200 OK`, async () => {

          return (
            await request (server)
            .get ('/api/jokes')
            .set ('Authorization', token)
            .send ()
            .then ((re) => {
              expect (re.status) .toEqual (200)
            })
          )

        })

        /// RESPONSE TYPE? ///

        test (`responds with JSON body`, async () => {

          return (
            await request (server)
            .get ('/api/jokes')
            .set ('Authorization', token)
            .send ()
            .then ((res) => {
              expect (res.type).toMatch (/json/i)
            })
          )

        })

      })

    })

  }

})
