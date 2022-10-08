const PrismaClient = require('@prisma/client');

const prisma = new PrismaClient.PrismaClient({log: ['query', 'info']});


  async function createEmpresas(req, res) {
    try {
      const { cnpj, nome, email, descricao, imagem_perfil, senha, telefone, celular, facebook, whatsapp, linkedin, telegram } =
        req.body;

      let empresa = await prisma.tb_empresa.findUnique({ where: { cnpj } });

      if (empresa) {
        return res.json({ error: "Cnpj ja atribuido a uma empresa" });
      }

      empresa = await prisma.tb_empresa.findUnique({ where: { email } });

      if (empresa) {
        return res.json({ error: "Email ja atribuido a uma empresa" });
      }

      empresa = await prisma.tb_empresa.create({
        data: {
          cnpj,
          nome,
          email,
          descricao,
          imagem_perfil,
          senha,
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
        where: { cnpj: Number(cnpj) },
        include: {
          Contatos_empresa: true,
        },
      });
      if (!empresas) {
        return res.json({ error: "Não foi possivel encontrar essa empresa" });
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
        where: { cnpj: Number(cnpj) },
      });

      if (!empresas)
        return res.json({ error: "Não foi possivel encontrar essa empresa" });

      empresas = await prisma.tb_empresa.update({
        where: { cnpj: Number(cnpj) },
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
        where: { cnpj: Number(cnpj) },
      });

      if (!empresas)
        return res.json({ error: "Não foi possivel encontrar essa empresa" });

      await prisma.tb_empresa.delete({ where: { cnpj: Number(cnpj) } });

      return res.json({ message: "Empresa deletada com sucesso" });
    } catch (error) {
      return res.json({ error });
    }
  }


  module.exports.createEmpresas =  createEmpresas;
  module.exports.deleteEmpresa = deleteEmpresa;
  module.exports.findAllEmpresas = findAllEmpresas;
  module.exports.findEmpresa = findEmpresa;
  module.exports.updateEmpresa = updateEmpresa;

