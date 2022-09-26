import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async findContatoEmpresa(req, res) {
    try {
      const { cnpj } = req.params;
      const empresas = await prisma.empresa.findUnique({
        where: { cnpj: Number(cnpj) },
        include: {
          Contatos_empresa: true,
        },
      });
      if (!empresas) {
        return res.json({ error: "Não foi possivel encontrar essa empresa" });
      }

      return res.json(empresas.Contatos_empresa);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateContatoEmpresa(req, res) {
    try {
      const { cnpj } = req.params;
      const { telefone, celular, facebook, whatsapp, linkedin, telegram } =
        req.body;

      let empresas = await prisma.empresa.findUnique({
        where: { cnpj: Number(cnpj) },
      });

      if (!empresas)
        return res.json({ error: "Não foi possivel encontrar essa empresa" });

      empresas = await prisma.contatos_empresa.update({
        where: { empresaId: Number(cnpj) },
        data: {
          telefone,
          celular,
          facebook,
          whatsapp,
          linkedin,
          telegram,
        },
      });

      return res.json(empresas);
    } catch (error) {
      return res.json({ error });
    }
  },
};
