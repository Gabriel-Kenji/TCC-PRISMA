const PrismaClient = require("@prisma/client");
const http = require('http');
require('dotenv/config');

const prisma = new PrismaClient.PrismaClient({ log: ["query", "info"] });
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); 

let datetime = require("node-datetime");

async function whatsTwilio(data, host) {
  try {

    const compativel = await prisma.tb_frete.findMany({
      where:{
        OR: [
          {cidade_origem: data.cidade_origem},
          {cidade_destino: data.cidade_destino},
          {estado_origem: data.estado_origem},
          {estado_destino: data.estado_destino},
          {data_postagem: data.data_inicio},
        ],
      },
      take: 10
    })
    let text = ""
    for (const veiculosId of compativel) {
      text += "🚚Origem: 📦Destino: " + host + '/fretes/' + veiculosId.id + "\n\n "
      
    }
    
    twilio.messages 
    .create({ 
       body: text, 
       from: 'whatsapp:+14155238886',       
       to: 'whatsapp:+5511950538816' 
     }) 
    .then(message => console.log(message)) 
    .catch(err => console.log(err));
  } catch (error) {
    console.log(error)
  }
}

async function smsTwilio(data, host) {
  console.log("aa")
  try {
    const compativel = await prisma.tb_frete.findMany({
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
    let text = "-----------------------------------"
    for (const veiculosId of compativel) {
      text += '\n\n'+ host +'/fretes/' + veiculosId.id 
      
    }
      twilio.messages 
      .create({ 
         body: text,  
         messagingServiceSid: 'MG7cdc4e91ff1c6ad657865234b461e680',      
         to: '+5511950538816' 
       }) 
      .then(message => console.log(message)) 
      .catch(err => console.log(err));
  } catch (error) {
  }
}

http.createServer(function (req, res) {
  var hostname = req.headers.host; // hostname = 'localhost:8080'
  var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
  console.log('http://' + hostname + pathname);

  res.writeHead(200);
  res.end();
}).listen(8080);

module.exports.whatsTwilio = whatsTwilio;
module.exports.smsTwilio = smsTwilio;