const PrismaClient = require("@prisma/client");

require('dotenv/config');

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); 

let datetime = require("node-datetime");

async function whatsTwilio(data) {
  try {

    const compativel = await prisma.frete.findMany({
      where:{
        OR: [
          {cidade_origem: data.cidade_origem},
          {cidade_destino: data.cidade_destino},
          {estado_origem: data.estado_origem},
          {estado_destino: data.estado_destino},
          {data_postagem: data.data_inicio},
        ],
      },
      take: 2
    })
    
    twilio.messages 
    .create({ 
       body: JSON.stringify(response), 
       from: 'whatsapp:+14155238886',       
       to: 'whatsapp:+5511950538816' 
     }) 
    .then(message => console.log(message.sid)) 
    .catch(err => console.log(err));
  } catch (error) {
    console.log(error)
  }
}

async function smsTwilio(data) {
  try {
      twilio.messages 
      .create({ 
         body: 'teste',  
         messagingServiceSid: 'MG7cdc4e91ff1c6ad657865234b461e680',      
         to: '+5511950538816' 
       }) 
      .then(message => console.log(message.sid)) 
      .catch(err => console.log(err));
  } catch (error) {
  }
}

module.exports.whatsTwilio = whatsTwilio;
module.exports.smsTwilio = smsTwilio;