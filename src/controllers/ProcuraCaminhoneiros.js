const PrismaClient = require("@prisma/client");
const http = require('http');
const getCidadeUF = require('./getCidadeUF.js')
const twilio = require("./TwiloController.js")


require('dotenv/config');

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });

let datetime = require("node-datetime");

async function smsTwilio(data, host, carroceriaId, veiculoId) {

  try {
    const and = {
      AND: [
        {
          estado_destino: {
            contains: data.estado_destino
          }
        },
          {
            estado_origem: {
              contains: data.estado_origem
            }
          },
        {
          cidade_destino: {
            contains: data.cidade_destino
          }
        },
        {
          cidade_origem: {
            contains: data.cidade_origem
          }
        },
        {
          data_postagem:
          {
            gt: data.data_inicio
          }
        },
        data.agenciamento ? { pedagio: { equals: data.agenciamento } } : {},
        data.lona ? { pedagio: { equals: data.lona } } : {},
        data.pedagio ? { pedagio: { equals: data.pedagio } } : {},
        data.rastreamento ? { rastreamento: { equals: data.rastreamento } } : {},
        data.especieId ? { especieId: { equals: data.especieId } } : {}
      ]
    }

    for (const carrocerias of carroceriaId) {
      for (const veiculos of veiculoId) {
        const users = await prisma.tb_procura_fretes.findMany({
          where: {
            ...and,
            AND: [
              {
                caminhoneiro: {
                  veiculoId: {
                    equals: veiculos
                  },
                  carroceriaId: {
                    equals: carrocerias
                  }
                }
              },
            ],
          },
          include: {
            caminhoneiro: true
          }
        })

        for (const user of users) {
          let cidade_origem = await getCidadeUF.getCidade(data.cidade_origem)
          let cidade_destino = await getCidadeUF.getCidade(data.cidade_destino)
          let uf_origem = await getCidadeUF.getUF(data.estado_origem)
          let uf_destino = await getCidadeUF.getUF(data.estado_destino)
          const text = "\n🚚Origem: " + cidade_origem + "/" + uf_origem + "\n📦Destino: " + cidade_destino + "/" + uf_destino + " \n💸Valor: " + data.preco
          console.log("\n"+ user.caminhoneiro.celular + text)
          twilio.smsTwilio(text, user.caminhoneiro.celular)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.smsTwilio = smsTwilio;