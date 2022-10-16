const { body, check } = require('express-validator');
const { parse } = require('telefone');
const {validator} = require('cpf-cnpj-validator');
const Joi = require('@hapi/joi').extend(validator)

const cpfSchema = Joi.document().cpf();


module.exports.validationCaminhoneiro = [
    body("email").isEmail().withMessage('E-mail invalido'),
    body("senha").isLength({ min: 8 }).withMessage('Senha invalida'),
    body("nome").isLength({ min: 2 }).withMessage('Nome invalido'),
    body("cpf").custom(value => { 
        if(cpfSchema.validate(value).error || !value)
        {
            return false
        }
        return cpfSchema.validate(value);
    }).optional(false).withMessage('Cnpj invalido'),
    body("celular").custom(value => { 
        return parse(value, { apenasCelular: true });
    }).withMessage('Numero de celular invalido'),
    body("notificacao").isBoolean().optional(true).withMessage('Notificaçao precisa ser Booleno'),
    body("carroceriaId").isInt().withMessage('Precisa ser um Int'),
    body("veiculoId").isInt().withMessage('Precisa ser um Int')
]


