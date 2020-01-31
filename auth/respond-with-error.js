/**************************************/

module.exports = respondWithError

function respondWithError (error) {
  return (res, req) => {

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
