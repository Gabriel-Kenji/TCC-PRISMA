const PrismaClient = require('@prisma/client');

const prisma = new PrismaClient.PrismaClient({log: ['query', 'info']});


  async function createCaminhoneiro(req, res) {
    try {
      const {
        cpf,
        nome,
        senha,
        email,
        celular,
        notificacao,
        carroceriaId,
        veiculoId,
      } = req.body;

      let caminhoneiro = await prisma.caminhoneiro.findUnique({
        where: { cpf },
      });

      if (caminhoneiro) {
        return res.json({ error: "Cpf ja atribuido a um caminhoneiro" });
      }

      caminhoneiro = await prisma.caminhoneiro.findUnique({ where: { email } });

      if (caminhoneiro) {
        return res.json({ error: "Email ja atribuido a um caminhoneiro" });
      }
      caminhoneiro = await prisma.caminhoneiro.create({
        data: {
          cpf,
          nome,
          senha,
          email,
          celular,
          notificacao,
          carroceriaId,
          veiculoId,
        },
        include: {
          carroceria: true,
          veiculo: true,
        },
      });
      return res.json(caminhoneiro);
    } catch (error) {
      return res.json(error);
    }
  }

  async function findAllCaminhoneiro(req, res) {
    try {
      const caminhoneiros = await prisma.caminhoneiro.findMany({
        include: {
          carroceria: true,
          veiculo: true,
        },
      });
      return res.json(caminhoneiros);
    } catch (error) {
      return res.json({ error });
    }
  }

  async function findCaminhoneiro(req, res) {
    try {
      const { cpf } = req.params;
      const caminhoneiros = await prisma.caminhoneiro.findUnique({
        where: { cpf: Number(cpf) },
        include: {
          carroceria: true,
          veiculo: true,
        },
      });
      if (!caminhoneiros) {
        return res.json({
          error: "Não foi possivel encontrar esse caminhoneiro",
        });
      }
      return res.json(caminhoneiros);
    } catch (error) {
      return res.json({ error });
    }
  }

  async function updateCaminhoneiro(req, res) {
    try {
      const { cpf } = req.params;
      const {
        nome,
        senha,
        email,
        celular,
        notificacao,
        carroceriaId,
        veiculoId,
      } = req.body;

      let caminhoneiros = await prisma.caminhoneiro.findUnique({
        where: { cpf: Number(cpf) },
      });

      if (!caminhoneiros)
        return res.json({
          error: "Não foi possivel encontrar esse caminhoneiro",
        });

      caminhoneiros = await prisma.caminhoneiro.update({
        where: { cpf: Number(cpf) },
        data: {
          nome,
          senha,
          email,
          celular,
          notificacao,
          carroceriaId,
          veiculoId,
        },
        include: {
          carroceria: true,
          veiculo: true,
        },
      });

      return res.json(caminhoneiros);
    } catch (error) {
      return res.json({ error });
    }
  }

  async function deleteCaminhoneiro(req, res) {
    try {
      const { cpf } = req.params;

      let caminhoneiros = await prisma.caminhoneiro.findUnique({
        where: { cpf: Number(cpf) },
      });

      if (!caminhoneiros)
        return res.json({ error: "Não foi possivel encontrar esse caminhoneiro" });

      await prisma.caminhoneiro.delete({ where: { cpf: Number(cpf) } });

      return res.json({ message: "Caminhoneiro deletada com sucesso" });
    } catch (error) {
      return res.json({ error });
    }
  }


  module.exports.createCaminhoneiro = createCaminhoneiro;
  module.exports.deleteCaminhoneiro = deleteCaminhoneiro;
  module.exports.findAllCaminhoneiro = findAllCaminhoneiro;
  module.exports.findCaminhoneiro = findCaminhoneiro;
  module.exports.updateCaminhoneiro = updateCaminhoneiro;
