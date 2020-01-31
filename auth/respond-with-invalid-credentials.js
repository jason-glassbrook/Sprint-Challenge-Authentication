/**************************************/

module.exports = respondWithInvalidCredentials

function respondWithInvalidCredentials (error) {
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
