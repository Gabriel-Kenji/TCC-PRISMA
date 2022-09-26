import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['query', 'info'] });

export default {
  async createEspecie(req, res) {
    try {
      const { especie } = req.body;

      let especies = await prisma.especie.findUnique({
        where: { especie },
      });
      if (especies) {
        return res.json({ error: "Especie ja existente" });
      }
      especies = await prisma.especie.create({
        data: {
            especie,
        },
      });

      return res.json(especies);
    } catch (error) {
      return res.json(error);
    }
  },

  async findAllEspecie(req, res) {
    try {
      const especies = await prisma.especie.findMany({});
      return res.json(especies);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findEspecie(req, res) {
    try {
      const { especie } = req.params;
      const especies = await prisma.especie.findUnique({
        where: { especie },
      });
      if (!especies) {
        return res.json({
          error: "Não foi possivel encontrar essa especie",
        });
      }
      return res.json(especies);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateEspecie(req, res) {
    try {
      const especieAntiga = req.params.especie;
      const { especie } = req.body;
      
      let especies = await prisma.especie.findUnique({
        where: { especie: especieAntiga },
      });
      if (!especies)
        return res.json({
          error: "Não foi possivel encontrar essa especie",
        });
        especies = await prisma.especie.update({
        where: { especie: especieAntiga },
        data: {
            especie,
        },
      });
      return res.json(especies);
    } catch (error) {
      return res.json({ error });
    }
  },

  async deleteEspecie(req, res) {
    try {
      const { especie } = req.params;

      let especies = await prisma.especie.findUnique({
        where: { especie },
      });

      if (!especies)
        return res.json({ error: "Não foi possivel encontrar essa carroceria" });

      await prisma.especie.delete({ where: {especie} });

      return res.json({ message: "Especie deletada com sucesso" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
