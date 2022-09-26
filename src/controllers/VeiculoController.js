import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createVeiculo(req, res) {
    try {
      const { veiculo } = req.body;

      let veiculos = await prisma.veiculo.findUnique({
        where: { veiculo },
      });

      if (veiculos) {
        return res.json({ error: "Veiculo ja existente" });
      }
      veiculos = await prisma.veiculo.create({
        data: {
            veiculo,
        },
      });

      return res.json(veiculos);
    } catch (error) {
      return res.json(error);
    }
  },

  async findAllVeiculo(req, res) {
    try {
      const veiculos = await prisma.veiculo.findMany({});
      return res.json(veiculos);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findVeiculo(req, res) {
    try {
      const { veiculo } = req.params;
      const veiculos = await prisma.veiculo.findUnique({
        where: { veiculo },
      });
      if (!veiculos) {
        return res.json({
          error: "Não foi possivel encontrar esse veiculo",
        });
      }
      return res.json(veiculos);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateVeiculo(req, res) {
    try {
      const veiculoAntigo = req.params.veiculo;
      const { veiculo } = req.body;
      
      let veiculos = await prisma.veiculo.findUnique({
        where: { veiculo: veiculoAntigo },
      });
      if (!veiculos)
        return res.json({
          error: "Não foi possivel encontrar esse veiculo",
        });
        veiculos = await prisma.veiculo.update({
        where: { veiculo: veiculoAntigo },
        data: {
            veiculo,
        },
      });
      return res.json(veiculos);
    } catch (error) {
      return res.json({ error });
    }
  },

  async deleteVeiculo(req, res) {
    try {
      const { veiculo } = req.params;

      let veiculos = await prisma.veiculo.findUnique({
        where: { veiculo },
      });

      if (!veiculos)
        return res.json({ error: "Não foi possivel encontrar esse veiculo" });

      await prisma.veiculo.delete({ where: {veiculo} });

      return res.json({ message: "Veiculo deletado com sucesso" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
