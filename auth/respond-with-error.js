/**************************************/

module.exports = respondWithError

function respondWithError (error) {
  return (req, res) => {

    res
    .status (500)
    .json ({
      'error' : {
        'message' : 'internal server error',
        'details' : error,
      },
    })

  }
}
