const twilio = require("./TwiloController.js")


const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });

let datetime = require("node-datetime");

async function createProcuraFrete(req, res) {
  try {
    const {
      cidade_destino,
      cidade_origem,
      estado_destino,
      estado_origem,
      data_inicio,
      ativo,
      agenciamento,
      lona,
      pedagio,
      rastreamento,
      especie,
      cpf,
    } = req.body;
    let Procurafretes  = await prisma.tb_procura_fretes.findMany({
      where:{
        cpf
      }
    })
    if(Procurafretes.length == 0){
      Procurafretes = await prisma.tb_procura_fretes.create({
        data: {
          cidade_destino,
          cidade_origem,
          estado_destino,
          estado_origem,
          data_inicio: datetime.create(data_inicio)._now,
          cpf,
          ativo: true,
          agenciamento,
          lona,
          pedagio,
          rastreamento,
          especieId: especie
        },
        include: {
          caminhoneiro: {
            include: { carroceria: true, veiculo: true },
          },
        },
      });
      twilio.whatsTwilio(Procurafretes, "http://" + req.get('host'));
      return res.json({ Procurafretes });
    }else{
      
      const id = Procurafretes[0].id
      const updateProcurafretes = await prisma.tb_procura_fretes.update({
        where: {
          id
        },
        data: {
          cidade_destino,
          cidade_origem,
          estado_destino,
          estado_origem,
          data_inicio: datetime.create(data_inicio)._now,
          cpf,
          ativo: true,
          agenciamento,
          lona,
          pedagio,
          rastreamento,
          especieId: especie
        },
        include: {
          caminhoneiro: {
            include: { carroceria: true, veiculo: true },
          },
        }
      })
      twilio.whatsTwilio(updateProcurafretes, "https://" + req.get('host'));
      return res.json({ updateProcurafretes });
    }
  } catch (error) {
    return res.json(error);
  }
}

async function findAllProcuraFretes(req, res) {
  try {
    const procurafretes = await prisma.tb_procura_fretes.findMany({
      include: {
        caminhoneiro: {
          include: { carroceria: true, veiculo: true },
        },
      },
    });
    return res.json(procurafretes);
  } catch (error) {
    return res.json({ error });
  }
}

async function findProcuraFretes(req, res) {
  try {
    const { id } = req.params;
    const procurafretes = await prisma.tb_procura_fretes.findUnique({
      where: { id },
      include: {
        caminhoneiro: {
          include: { carroceria: true, veiculo: true },
        },
      },
    });
    if (!procurafretes) {
      return res.json({
        error: "Não foi possivel encontrar esse procura fretes",
      });
    }
    return res.json(procurafretes);
  } catch (error) {
    return res.json({ error });
  }
}

async function updateProcuraFrete(req, res) {
  try {
    const { id } = req.params;
    const {
      cidade_destino,
      cidade_origem,
      estado_destino,
      estado_origem,
      data_inicio,
      cpf,
    } = req.body;
    
    let procurafretes = await prisma.tb_procura_fretes.findUnique({
      where: { id },
    });
    if (!procurafretes)
      return res.json({
        error: "Não foi possivel encontrar esse procura fretes",
      });
    procurafretes = await prisma.tb_procura_fretes.update({
      where: { id },
      data: {
        cidade_destino,
        cidade_origem,
        estado_destino,
        estado_origem,
        data_inicio: datetime.create(data_inicio)._now,
        cpf,
      },
      include: {
        caminhoneiro: {
          include: { carroceria: true, veiculo: true },
        },
      },
    });
    return res.json(procurafretes);
  } catch (error) {
    return res.json({ error });
  }
}

async function deleteProcuraFrete(req, res) {
  try {
    const { id } = req.params;

    let procurafretes = await prisma.tb_procura_fretes.findUnique({
      where: { id },
    });

    if (!procurafretes)
      return res.json({
        error: "Não foi possivel encontrar esse procura fretes",
      });

    await prisma.tb_procura_fretes.delete({ where: { id } });

    return res.json({ message: "Frete deletado com sucesso" });
  } catch (error) {
    return res.json({ error });
  }
}

module.exports.createProcuraFrete = createProcuraFrete;
module.exports.findAllProcuraFretes = findAllProcuraFretes;
module.exports.findProcuraFretes = findProcuraFretes;
module.exports.updateProcuraFrete = updateProcuraFrete;
module.exports.deleteProcuraFrete = deleteProcuraFrete;
