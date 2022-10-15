const PrismaClient = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient.PrismaClient({ log: ['query', 'info'] });


async function createEmpresas(req, res) {
  try {
    const { cnpj, nome, email, descricao, imagem_perfil, senha, telefone, celular, facebook, whatsapp, linkedin, telegram } =
      req.body;

    let empresa = await prisma.tb_empresa.findUnique({ where: { cnpj } });

    if (empresa) {
      return res.status(400).json({ error: "Cnpj ja atribuido a uma empresa" });
    }

    empresa = await prisma.tb_empresa.findUnique({ where: { email } });

    if (empresa) {
      return res.status(400).json({ error: "Email ja atribuido a uma empresa" });
    }

    bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
      if (errBcrypt) { return res.status(500).json({ error: errBcrypt }); }
      empresa = await prisma.tb_empresa.create({
        data: {
          cnpj,
          nome,
          email,
          descricao,
          imagem_perfil,
          senha: hash,
          Contatos_empresa: {
            create: {
              telefone,
            },
          },
        },
        include: {
          Contatos_empresa: true,
        },
      });

      return res.json(empresa);
    })


  } catch (error) {
    return res.json(error);
  }
}

async function findAllEmpresas(req, res) {
  try {
    const empresas = await prisma.tb_empresa.findMany({
      include: {
        Contatos_empresa: true,
      },
    });
    return res.json(empresas);
  } catch (error) {
    return res.json({ error });
  }
}

async function findEmpresa(req, res) {
  try {
    const { cnpj } = req.params;
    const empresas = await prisma.tb_empresa.findUnique({
      where: { cnpj: cnpj },
      include: {
        Contatos_empresa: true,
      },
    });
    if (!empresas) {
      return res.status(400).json({ error: "Não foi possivel encontrar essa empresa" });
    }
    return res.json(empresas);
  } catch (error) {
    return res.json({ error });
  }
}

async function updateEmpresa(req, res) {
  try {
    const { cnpj } = req.params;
    const { nome, email, descricao, imagem_perfil, senha, telefone } = req.body;

    let empresas = await prisma.tb_empresa.findUnique({
      where: { cnpj: cnpj },
    });

    if (!empresas)
      return res.status(400).json({ error: "Não foi possivel encontrar essa empresa" });

    empresas = await prisma.tb_empresa.update({
      where: { cnpj: cnpj },
      data: {
        nome,
        email,
        descricao,
        imagem_perfil,
        senha,
        Contatos_empresa: {
          update: {
            telefone,
          },
        },
      },
      include: {
        Contatos_empresa: true,
      },
    });

    return res.json(empresas);
  } catch (error) {
    return res.json({ error });
  }
}

async function deleteEmpresa(req, res) {
  try {
    const { cnpj } = req.params;

    let empresas = await prisma.tb_empresa.findUnique({
      where: { cnpj: cnpj },
    });

    if (!empresas)
      return res.status(400).json({ error: "Não foi possivel encontrar essa empresa" });

    await prisma.tb_empresa.delete({ where: { cnpj: cnpj } });

    return res.json({ message: "Empresa deletada com sucesso" });
  } catch (error) {
    return res.json({ error });
  }
}


module.exports.createEmpresas = createEmpresas;
module.exports.deleteEmpresa = deleteEmpresa;
module.exports.findAllEmpresas = findAllEmpresas;
module.exports.findEmpresa = findEmpresa;
module.exports.updateEmpresa = updateEmpresa;

