const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });

async function findAllVeiculo(req, res) {
  try {
    const veiculos = await prisma.tc_veiculo.findMany({});
    return res.json(veiculos);
  } catch (error) {
    return res.json({ error });
  }
}

async function findVeiculo(req, res) {
  try {
    const { veiculo } = req.params;
    const veiculos = await prisma.tc_veiculo.findUnique({
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
}

async function deleteVeiculo(req, res) {
  try {
    const { veiculo } = req.params;

    let veiculos = await prisma.tc_veiculo.findUnique({
      where: { veiculo },
    });

    if (!veiculos)
      return res.json({ error: "Não foi possivel encontrar esse veiculo" });

    await prisma.tc_veiculo.delete({ where: { veiculo } });

    return res.json({ message: "Veiculo deletado com sucesso" });
  } catch (error) {
    return res.json({ error });
  }
}

module.exports.findAllVeiculo = findAllVeiculo;
module.exports.findVeiculo = findVeiculo;
module.exports.deleteVeiculo = deleteVeiculo;
