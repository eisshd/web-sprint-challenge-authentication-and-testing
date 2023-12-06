const User = require('../../users/users-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../../config')

const checkUsernameExists = async (req, res, next) => {
    try{
      const [user] = await User.findBy({username: req.body.username})
      if(!user){
        next({status: 422, message: 'username taken'})
      } else {
        next()
      }
    }
    catch(err){
      next(err)
    }
}

const buildToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = {
  checkUsernameExists,
  buildToken
}
