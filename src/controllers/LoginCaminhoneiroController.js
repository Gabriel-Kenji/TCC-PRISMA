const PrismaClient = require("@prisma/client");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {validationResult } = require('express-validator');

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });

async function LoginCaminhoneiro(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { email, senha } = req.body;
    const caminhoneiro = await prisma.tb_caminhoneiro.findUnique({
      where: { email },
    });
    if (!caminhoneiro) {
      return res.status(401).json({ mensagem: "Falha na autenticação" });
    }
    bcrypt.compare(senha, caminhoneiro.senha, (err, result) => {
      if (err) {
        return res.status(401).send({ mensagem: "Falha na autenticação" })
      }
      if (result) {
        let token = jwt.sign({
          id_caminhoneiro: caminhoneiro.cpf,
          email: caminhoneiro.email
        },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          });
        return res.status(200).send({
          mensagem: "Autenticado com sucesso",
          token
        })
      }
      return res.status(401).send({ mensagem: "Falha na autenticação" })
    })


  } catch (error) {
    return res.json({ error });
  }
}

module.exports.LoginCaminhoneiro = LoginCaminhoneiro;