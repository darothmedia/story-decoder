const express = require('express');
const router = express.Router();
const Story = require('../../models/Story')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')


router.get('/', (req, res) => res.json({
  message: 'You are now at the story route'
}))

module.exports = router