import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createCarroceria(req, res) {
    try {
      const { carroceria } = req.body;

      let carrocerias = await prisma.carroceria.findUnique({
        where: { carroceria },
      });

      if (carrocerias) {
        return res.json({ error: "Carrocerias ja existente" });
      }
      carrocerias = await prisma.carroceria.create({
        data: {
          carroceria,
        },
      });

      return res.json(carrocerias);
    } catch (error) {
      return res.json(error);
    }
  },

  async findAllCarroceria(req, res) {
    try {
      const carrocerias = await prisma.carroceria.findMany({});
      return res.json(carrocerias);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findCarroceria(req, res) {
    try {
      const { carroceria } = req.params;
      const carrocerias = await prisma.carroceria.findUnique({
        where: { carroceria },
      });
      if (!carrocerias) {
        return res.json({
          error: "Não foi possivel encontrar essa carroceria",
        });
      }
      return res.json(carrocerias);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateCarroceria(req, res) {
    try {
      const carroceriaAntiga = req.params.carroceria;
      const { carroceria } = req.body;
      
      let carrocerias = await prisma.carroceria.findUnique({
        where: { carroceria: carroceriaAntiga },
      });
      if (!carrocerias)
        return res.json({
          error: "Não foi possivel encontrar essa carroceria",
        });
      carrocerias = await prisma.carroceria.update({
        where: { carroceria: carroceriaAntiga },
        data: {
          carroceria,
        },
      });
      return res.json(carrocerias);
    } catch (error) {
      return res.json({ error });
    }
  },

  async deleteCarroceria(req, res) {
    try {
      const { carroceria } = req.params;

      let carrocerias = await prisma.carroceria.findUnique({
        where: { carroceria },
      });

      if (!carrocerias)
        return res.json({ error: "Não foi possivel encontrar essa carroceria" });

      await prisma.carroceria.delete({ where: {carroceria} });

      return res.json({ message: "Carroceria deletada com sucesso" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
