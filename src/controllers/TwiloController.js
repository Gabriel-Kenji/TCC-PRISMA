const PrismaClient = require("@prisma/client");
const http = require('http');
const getCidadeUF = require('./getCidadeUF.js')


require('dotenv/config');

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


async function smsTwilio(data, cel) {
  try {
    twilio.messages
      .create({
        body: data,
        from: '+19045606205',
        to: '+55' + cel
      })
      .then(message => console.log(message))
      .catch(err => console.log(err));
  } catch (error) {
    console.log(error)
  }
}

module.exports.smsTwilio = smsTwilio;

// async function whatsTwilio(data, host) {

//   try {
//     const and = {
//       AND: [
//         {
//           estado_destino: {
//             contains: data.estado_destino
//           }
//         },
//         {
//           estado_origem: {
//             contains: data.estado_origem
//           }
//         },
//         {
//           cidade_destino: {
//             contains: data.cidade_destino
//           }
//         },
//         {
//           cidade_origem: {
//             contains: data.cidade_origem
//           }
//         },
//         {
//           data_coleta:
//           {
//             gt: data.data_inicio
//           }
//         },
//         data.agenciamento ? { pedagio: { equals: data.agenciamento } } : {},
//         data.lona ? { pedagio: { equals: data.lona } } : {},
//         data.pedagio ? { pedagio: { equals: data.pedagio } } : {},
//         data.rastreamento ? { rastreamento: { equals: data.rastreamento } } : {},
//         data.especieId ? { especieId: { equals: data.especieId } } : {}
//       ]
//     }
//     const compativel = await prisma.tb_frete.findMany({

//       where: {
//         ...and
//       },
//       include:{
//         Veiculo_Frete: true,
//         Carroceria_Frete: true
//       }

//     })

//     let cidade_origem = null
//     let cidade_destino = null
//     let uf_destino = null
//     let uf_origem = null
//     let cont = 0
//     for (const fretes of compativel) {
//       let text = "Um novo Frete foi encontrado \n \n"
//       cidade_origem = await getCidadeUF.getCidade(fretes.cidade_origem)
//       cidade_destino = await getCidadeUF.getCidade(fretes.cidade_destino)
//       uf_origem = await getCidadeUF.getUF(fretes.estado_origem)
//       uf_destino = await getCidadeUF.getUF(fretes.estado_destino)


//       for(const veiculo of fretes.Veiculo_Frete){

//         for(const carroceria of fretes.Carroceria_Frete){
//           if(veiculo.veiculoId == data.caminhoneiro.veiculo.id && carroceria.carroceriaId == data.caminhoneiro.carroceria.id){
//             cont += 1;
//             if(cont <= 10){
//               text += "\n🚚Origem: " + cidade_origem + "/" + uf_origem + "\n📦Destino: " + cidade_destino + "/" + uf_destino + " \n💲Valor: " + fretes.preco
//               console.log(cont+ " " + text)

//               twilio.messages
//               .create({
//                 body: text,
//                 from: '+19045606205',
//                 to: '+55' + data.caminhoneiro.celular
//               })
//               .then(message => console.log(message))
//               .catch(err => console.log(err));
//             }

//           }
//         }
//       }
//     }  

//   } catch (error) {
//     console.log(error)
//   }
// }

// module.exports.whatsTwilio = whatsTwilio;
