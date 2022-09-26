const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });

let datetime = require("node-datetime");

async function createFrete(req, res) {
  try {
    const {
      cidade_origem,
      cidade_destino,
      estado_origem,
      estado_destino,
      descricao,
      forma_pagamento,
      produto,
      preco,
      peso,
      porcentagem_adiantamento,
      tipo_carga,
      data_coleta,
      data_entrega,
      ativo,
      agenciamento,
      lona,
      pedagio,
      rastreamento,
      empresaId,
      especieId,
    } = req.body;

    console.log("teste");
    const fretes = await prisma.frete.create({
      data: {
        cidade_destino,
        cidade_origem,
        data_coleta: datetime.create(data_coleta)._now,
        data_entrega: datetime.create(data_entrega)._now,
        estado_destino,
        estado_origem,
        preco,
        empresaId,
        ativo,
        especieId,
        descricao,
        forma_pagamento,
        produto,
        peso,
        porcentagem_adiantamento,
        tipo_carga,
        agenciamento,
        lona,
        pedagio,
        rastreamento,
      },
    });
    return res.json(fretes);
  } catch (error) {
    return res.json(error);
  }
}

async function findAllFrete(req, res) {
  try {
    const fretes = await prisma.frete.findMany({});
    return res.json(fretes);
  } catch (error) {
    return res.json({ error });
  }
}

async function findFrete(req, res) {
  try {
    const { id } = req.params;
    const frete = await prisma.frete.findUnique({
      where: { id },
    });
    if (!frete) {
      return res.json({
        error: "Não foi possivel encontrar esse frete",
      });
    }
    return res.json(frete);
  } catch (error) {
    return res.json({ error });
  }
}

async function updateFrete(req, res) {
  try {
    const { id } = req.params;
    const {
      cidade_origem,
      cidade_destino,
      estado_origem,
      estado_destino,
      descricao,
      forma_pagamento,
      produto,
      preco,
      peso,
      porcentagem_adiantamento,
      tipo_carga,
      data_coleta,
      data_entrega,
      ativo,
      agenciamento,
      lona,
      pedagio,
      rastreamento,
      empresaId,
      especieId,
    } = req.body;

    let frete = await prisma.frete.findUnique({
      where: { id },
    });
    if (!frete)
      return res.json({
        error: "Não foi possivel encontrar esse frete",
      });
    frete = await prisma.frete.update({
      where: { id },
      data: {
        cidade_origem,
        cidade_destino,
        estado_origem,
        estado_destino,
        descricao,
        forma_pagamento,
        produto,
        preco,
        peso,
        porcentagem_adiantamento,
        tipo_carga,
        data_coleta,
        data_entrega,
        ativo,
        agenciamento,
        lona,
        pedagio,
        rastreamento,
        empresaId,
        especieId,
      },
    });
    return res.json(frete);
  } catch (error) {
    return res.json({ error });
  }
}

async function deleteFrete(req, res) {
  try {
    const { id } = req.params;

    let frete = await prisma.frete.findUnique({
      where: { id },
    });

    if (!frete)
      return res.json({
        error: "Não foi possivel encontrar esse frete",
      });

    await prisma.frete.delete({ where: { id } });

    return res.json({ message: "Frete deletado com sucesso" });
  } catch (error) {
    return res.json({ error });
  }
}

module.exports.createFrete = createFrete;
module.exports.findAllFrete = findAllFrete;
module.exports.findFrete = findFrete;
module.exports.updateFrete = updateFrete;
module.exports.deleteFrete = deleteFrete;
