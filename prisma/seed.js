const Veiculos = require("./seed/seedVeiculos");
const Especies = require("./seed/seedEspecies")
const Carrocerias = require("./seed/seedCarrocerias")
const Empresas = require("./seed/seedEmpresa")

const PrismaClient = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient.PrismaClient({ log: ['query', 'info'] });



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
  const empresa = Empresas.empresa();
  bcrypt.hash(empresa.senha, 10, async (errBcrypt, hash) => {
    await prisma.tb_empresa.create({
      data: {
        cnpj: empresa.cnpj,
        nome: empresa.nome,
        email: empresa.email,
        descricao: empresa.descricao,
        senha: hash,
        Contatos_empresa: {
          create: {
            telefone: empresa.telefone,
          },
        },
      },
      include: {
        Contatos_empresa: true,
      }
    })
  })
};
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

