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

module.exports = router;