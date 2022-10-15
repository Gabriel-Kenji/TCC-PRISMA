const PrismaClient = require("@prisma/client");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });

async function LoginEmpresa(req, res) {
    try {
      const { email, senha } = req.body;
      const empresa = await prisma.tb_empresa.findUnique({
        where: { email },
      });
      if (!empresa) {
        return res.status(401).json({ mensagem: "Falha na autenticação" });
      }
      bcrypt.compare(senha, empresa.senha, (err, result) => {
        if(err) {
            return res.status(401).send({ mensagem: "Falha na autenticação" })
        }
        if(result) {
            let token = jwt.sign({
                id_empresa: empresa.cnpj,
                email: empresa.email
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

module.exports.LoginEmpresa = LoginEmpresa;