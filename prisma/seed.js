const Veiculos = require( "./seed/seedVeiculos");
const Especies = require("./seed/seedEspecies")
const Carrocerias = require("./seed/seedCarrocerias")

const PrismaClient = require('@prisma/client');

const prisma = new PrismaClient.PrismaClient({log: ['query', 'info']});


async function main() {
    await prisma.tc_veiculo.createMany({
        data: Veiculos.veiculo()
    })

    await prisma.tc_especie.createMany({
        data: Especies.especie()
    })

    await prisma.tc_carroceria.createMany({
        data: Carrocerias.carroceria()
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

