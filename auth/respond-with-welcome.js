/**************************************/

module.exports = respondWithWelcome

function respondWithWelcome (user, token) {
  return (res, req) => {

    res
    .status (200)
    .json ({
      'message' : `Welcome, ${user.username}. Here... Take this.`,
      token,
    })

  }
}
