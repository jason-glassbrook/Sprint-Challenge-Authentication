/**************************************/

module.exports = respondWithInvalidCredentials

function respondWithInvalidCredentials () {
  return (req, res) => {

    res
    .status (401)
    .json ({
      'error' : {
        'message' : `invalid credentials`,
      },
    })

  }
}
