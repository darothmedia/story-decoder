const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateSubmitInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : "";
  data.name = validText(data.name) ? data.name : "";
  data.emoji = validText(data.emoji) ? data.emoji : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'We need your email address to register or log in!'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}