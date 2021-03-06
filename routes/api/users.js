const express = require('express');
const router = express.Router();
const User = require ('../../models/User')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')

const validateSubmitInput = require('../../validation/submit');

router.get('/', (req, res) => res.json({
  message: 'You are now at the user route'
}))

// Get Current User
router.get('/current', passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      emoji: req.user.emoji
    })
})

// Registration & Login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateSubmitInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  };

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        //log the user in
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          emoji: user.emoji
        }
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              message: `Login successful`,
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        return res.status(404).json({email: 'No account found for this email'})
      }
    })
})

router.post('/submit', (req, res) => {
  const {errors, isValid} = validateSubmitInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  };

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        //log the user in
        if (req.body.emoji) {
          user.emoji = req.body.emoji
          user.save()
        };

        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          emoji: user.emoji
        }
        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 36000},
          (err, token) => {
            res.json({
              //welcome the user back
              message: `Welcome back, ${user.name ? user.name : user.email}!`,
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        //create a new user
        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          emoji: req.body.emoji
        });
        newUser.save()
          .then(user => {
            const payload = {
              id: user.id,
              email: user.email,
              name: user.name,
              emoji: user.emoji
            }
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 36000 },
              (err, token) => {
                res.json({
                  //welcome the user back
                  message: `Welcome ${user.name ? user.name : user.email}!`,
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          })
          .catch (err => console.log(err))
      }
    })
})

module.exports = router;