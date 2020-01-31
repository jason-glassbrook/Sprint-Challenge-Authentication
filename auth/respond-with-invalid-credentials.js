/**************************************/

module.exports = respondWithInvalidCredentials

function respondWithInvalidCredentials (error) {
  return (res, req) => {

    res
    .status (401)
    .json ({
      'error' : {
        'message' : `invalid credentials`,
      },
    })

  }
}
