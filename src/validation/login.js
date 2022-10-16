const { body } = require('express-validator');

module.exports.validationLogin = [
    body("email").isEmail().optional(true),
    body("senha").isLength({min: 8})
]