const express = require('express');
const router = express.Router();
const User = require ('../../models/User')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')

// const validateRegisterInput = require('../../validations/register');
// const validateLoginInput = require('../../validations/login');

router.get('/', (req, res) => res.json({
  message: 'You are now at the user route'
}))

// Registration & Login
router.post('/submit', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        //log the user in

        //add user details if provided
        if (req.body.name) {
          user.name = req.body.name
          user.save()
        };
        if (req.body.emoji) {
          user.emoji = req.body.emoji
          user.save()
        };

        //welcome the user back
        res.json({
          message: `Welcome back, ${user.name ? user.name : user.email}!`
        })
      } else {
        //create a new user
        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          emoji: req.body.emoji
        });
        newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
      }
    })
})

module.exports = router;