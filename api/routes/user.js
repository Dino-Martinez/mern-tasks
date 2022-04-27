const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = app => {
  app.get('/user/', async (req, res) => {
    const { user } = req
    console.log('authenticating...')
    return res.json({ payload: user !== null })
  })

  app.post('/user/sign-up', (req, res) => {
    const user = new User(req.body)
    user
      .save()
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
          expiresIn: '60 days'
        })
        res.cookie('authToken', token, { maxAge: 900000, httpOnly: true })
        res.json({ message: 'Logged in' })
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  app.post('/user/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // Find this user name
    User.findOne({ username }, 'username password')
      .then((user) => {
        if (!user) {
        // User not found
          return res.status(401).json({ message: 'Wrong username or password' })
        }
        // Check the password
        user.comparePassword(password, (err, isMatch) => {
          if (err) console.error(err)
          if (!isMatch) {
          // Password does not match
            return res.status(401).json({ message: 'Wrong username or password' })
          }

          // Create a token
          const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.SECRET,
            {
              expiresIn: '60 days'
            }
          )
          // Set a cookie and redirect to root
          res.cookie('authToken', token, { maxAge: 900000, httpOnly: true })
          res.json({ message: 'Logged in' })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  })
  app.get('/user/logout', (req, res) => {
    res.clearCookie('authToken')
    res.json({ message: 'Logged out' })
  })
}
