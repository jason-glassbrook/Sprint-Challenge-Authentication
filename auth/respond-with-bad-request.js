/**************************************/

module.exports = respondWithBadRequest

function respondWithBadRequest () {
  return (req, res) => {

    res
    .status (400)
    .json ({
      'error' : {
        'message' : `bad request`,
        'needs' : {
          'body' : {
            'username' : 'string',
            'password' : 'string',
          },
        },
      },
    })

  }
}
