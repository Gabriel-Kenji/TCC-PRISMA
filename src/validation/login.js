const { body } = require('express-validator');

module.exports.validationLogin = [
    body("email").isEmail().withMessage('E-mail invalido'),
    body("senha").isLength({min: 8}).withMessage('Senha invalida')
]