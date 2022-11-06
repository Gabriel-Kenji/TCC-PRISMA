const PrismaClient = require("@prisma/client");
const axios = require('axios');
const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });
const ProcuraCaminhoneiros = require('./ProcuraCaminhoneiros.js')

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
      veiculoId,
      carroceriaId,
    } = req.body;
    const fretes = await prisma.tb_frete.create({
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
        rastreamento
      },
    });

    fretes.veiculosFrete = [];

    for (const veiculosId of veiculoId) {
      let veiculos = await prisma.tb_veiculo_frete.create({
        data: { veiculoId: veiculosId, freteId: fretes.id },
        include: {
          veiculo: true,
        },
      });
      fretes.veiculosFrete.push(veiculos);
    }

    fretes.carroceriaFrete = [];

    for (const carroceriasId of carroceriaId) {
      let carroceria = await prisma.carroceria_Frete.create({
        data: { carroceriaId: carroceriasId, freteId: fretes.id },
        include: {
          carroceria: true,
        },
      });
      fretes.carroceriaFrete.push(carroceria);
    }
    
    ProcuraCaminhoneiros.whatsTwilio(fretes, "http://" + req.get('host'), carroceriaId, veiculoId)
    return res.json({ fretes });
  } catch (error) {
    console.log(error)
    return res.json(error);
  }
}

async function findAllFrete(req, res) {
  try {
    const count = await prisma.tb_frete.count()
    const fretes = await prisma.tb_frete.findMany({
      include: {
        Veiculo_Frete: { include: { veiculo: { select: { veiculo: true } } } },
        Carroceria_Frete: {
          include: { carroceria: { select: { carroceria: true } } },
        },
      },
    });
    return res.json({count: count, fretes: fretes});
  } catch (error) {
    return res.json({ error });
  }
}

async function findFrete(req, res) {
  try {
    const { id } = req.params;
    const frete = await prisma.tb_frete.findUnique({
      where: { id },
      include: {
        Veiculo_Frete: { include: { veiculo: { select: { veiculo: true } } } },
        Carroceria_Frete: {
          include: { carroceria: { select: { carroceria: true } } },
        },
      },
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

    let frete = await prisma.tb_frete.findUnique({
      where: { id },
    });
    if (!frete)
      return res.json({
        error: "Não foi possivel encontrar esse frete",
      });
    frete = await prisma.tb_frete.update({
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
        data_coleta: datetime.create(data_coleta)._now,
        data_entrega: datetime.create(data_entrega)._now,
        ativo,
        agenciamento,
        lona,
        pedagio,
        rastreamento,
        empresaId,
        especieId,
      },include: {
        Veiculo_Frete: { include: { veiculo: { select: { veiculo: true } } } },
        Carroceria_Frete: {
          include: { carroceria: { select: { carroceria: true } } },
        },
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

    let frete = await prisma.tb_frete.findUnique({
      where: { id },
    });

    if (!frete)
      return res.json({
        error: "Não foi possivel encontrar esse frete",
      });

    await prisma.tb_frete.delete({ where: { id } });

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
