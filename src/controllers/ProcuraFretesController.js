const PrismaClient = require("@prisma/client");
const getCidadeUF = require('./getCidadeUF.js')
const twilio = require("./TwiloController.js")


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

    const and = {
      AND: [
        {
          estado_destino: {
            contains: estado_destino
          }
        },
        {
          estado_origem: {
            contains: estado_origem
          }
        },
        {
          cidade_destino: {
            contains: cidade_destino
          }
        },
        {
          cidade_origem: {
            contains: cidade_origem
          }
        },
        {
          data_coleta:
          {
            gt: data_inicio
          }
        },
        agenciamento ? { agenciamento: { equals: agenciamento } } : {},
        lona ? { lona: { equals: lona } } : console.log("aa"),
        pedagio ? { pedagio: { equals: pedagio } } : {},
        rastreamento ? { rastreamento: { equals: rastreamento } } : {},
        especie ? { especieId: { equals: especie } } : {}
      ]
    }

    const nm_cidade_origem = await getCidadeUF.getCidade(cidade_origem);
    const sg_estado_origem = await getCidadeUF.getUF(estado_origem);
    let nm_cidade_destino = null;
    let sg_estado_destino = null;


    if (cidade_destino != null && cidade_destino != "")
      nm_cidade_destino = await getCidadeUF.getCidade(cidade_destino);

    if (estado_destino != null && estado_destino != "")
      sg_estado_destino = await getCidadeUF.getUF(estado_destino);



    let Procurafretes = await prisma.tb_procura_fretes.findMany({
      where: {
        cpf
      }
    })
    if (Procurafretes.length == 0) {
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
          especieId: especie,
          nm_cidade_destino,
          nm_cidade_origem,
          sg_estado_origem,
          sg_estado_destino
        },
        include: {
          caminhoneiro: {
            include: { carroceria: true, veiculo: true },
          },
        },
      });

      procurarfretes(and, Procurafretes)
      return res.json({ Procurafretes });
    } else {
      let id = Procurafretes[0].id
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
          especieId: especie,
          nm_cidade_destino,
          nm_cidade_origem,
          sg_estado_origem,
          sg_estado_destino
        },
        include: {
          caminhoneiro: {
            include: { carroceria: true, veiculo: true },
          },
        }
      })
      procurarfretes(and, updateProcurafretes);
      return res.json({ updateProcurafretes });
    }
  } catch (error) {
    console.log(error)
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

function teste(){
  console.log("teste")
}

async function procurarfretes(and, procuraFrete) {
  const compativel = await prisma.tb_frete.findMany({

    where: {
      ...and
    },
    include: {
      Veiculo_Frete: true,
      Carroceria_Frete: true
    }

  })
  let cidade_origem = null
  let cidade_destino = null
  let uf_destino = null
  let uf_origem = null
  let cont = 0
  for (const fretes of compativel) {
    
    cidade_origem = await getCidadeUF.getCidade(fretes.cidade_origem)
    cidade_destino = await getCidadeUF.getCidade(fretes.cidade_destino)
    uf_origem = await getCidadeUF.getUF(fretes.estado_origem)
    uf_destino = await getCidadeUF.getUF(fretes.estado_destino)


    for (const veiculo of fretes.Veiculo_Frete) {
      for (const carroceria of fretes.Carroceria_Frete) {
        
        if (veiculo.veiculoId == procuraFrete.caminhoneiro.veiculo.id && carroceria.carroceriaId == procuraFrete.caminhoneiro.carroceria.id) {
          cont += 1;
          console.log(veiculo.veiculoId + " " + carroceria.carroceriaId)
          if (cont <= 10) {
            let text = "Um novo Frete foi encontrado \n \n" +  "\n🚚Origem: " + procuraFrete.nm_cidade_origem + "/" + procuraFrete.sg_estado_origem + "\n📦Destino: " + procuraFrete.nm_cidade_destino + "/" + procuraFrete.sg_estado_destino + " \n💲Valor: " + fretes.preco
            console.log(cont + " " + text + " " + fretes.id)
            console.log(procuraFrete.caminhoneiro.celular)
            
            twilio.smsTwilio(text, procuraFrete.caminhoneiro.celular)
          }
        }
      }
    }
  }
}

module.exports.createProcuraFrete = createProcuraFrete;
module.exports.findAllProcuraFretes = findAllProcuraFretes;
module.exports.findProcuraFretes = findProcuraFretes;
module.exports.updateProcuraFrete = updateProcuraFrete;
module.exports.deleteProcuraFrete = deleteProcuraFrete;
