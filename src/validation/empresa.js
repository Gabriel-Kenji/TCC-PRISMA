const { body, check } = require('express-validator');
const { parse } = require('telefone');
const {validator} = require('cpf-cnpj-validator');
const Joi = require('@hapi/joi').extend(validator)

const cnpjSchema = Joi.document().cnpj();


module.exports.validatiorEmpresa = [
    body("email").isEmail().withMessage('E-mail invalido'),
    body("senha").isLength({ min: 8 }).withMessage('Senha invalida'),
    body("nome").isLength({ min: 2 }).withMessage('Nome invalido'),
    body("telefone").custom(value =>{
        return parse(value);
    }).withMessage('Numero de telefone invalido'),
    body("cnpj").custom(value => { 
        if(cnpjSchema.validate(value).error || !value)
        {
            return false
        }
        return cnpjSchema.validate(value);
    }).withMessage('Cnpj invalido'),
    body("celular").custom(value => { 
        return parse(value, { apenasCelular: true });
    }).optional(true).withMessage('Numero de celular invalido')
]
let cnpj = ""
cnpj = cnpj.replace(/[^\d]+/g, '');
const cpfSchema = Joi.document().cpf();

