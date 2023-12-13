const User = require('../../users/users-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../../config')

const checkUsernameExists = async (req, res, next) => {
    try{
      const user = await User.findBy({username: req.body.username})
      if(user.length > 0){
        next({status: 422, message: 'username taken'})
      } else if (!req.body.username || !req.body.password) {
        next({status: 401, message: 'username and password required'})
      } else {
        next()
      }
    }
    catch{
      next({status: 401, message: 'username and password required'})
    }
}

const checkValidUsername = async (req, res, next) => {
  try{
    const user = await User.findBy({username: req.body.username})
    if(user.length > 0 && req.body.username && req.body.password){
      req.user = user[0]
      next()
    } else if (!req.body.username || !req.body.password) {
      next({status: 401, message: 'username and password required'})
    }
    else {
      next({status: 422, message: 'Invalid credentials'})
    }
  }
  catch{
    next(res.status(401).json({message: 'username and password required'}))
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
  checkValidUsername,
  buildToken
}
