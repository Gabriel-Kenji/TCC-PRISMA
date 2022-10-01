-- CreateTable
CREATE TABLE `Empresa` (
    `cnpj` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `imagem_perfil` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Empresa_email_key`(`email`),
    PRIMARY KEY (`cnpj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contatos_empresa` (
    `id` VARCHAR(191) NOT NULL,
    `telefone` INTEGER NOT NULL,
    `celular` INTEGER NULL,
    `facebook` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `telegram` VARCHAR(191) NULL,
    `empresaId` INTEGER NOT NULL,

    UNIQUE INDEX `Contatos_empresa_empresaId_key`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veiculo` (
    `id` VARCHAR(191) NOT NULL,
    `veiculo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Veiculo_veiculo_key`(`veiculo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carroceria` (
    `id` VARCHAR(191) NOT NULL,
    `carroceria` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Carroceria_carroceria_key`(`carroceria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Caminhoneiro` (
    `cpf` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `celular` INTEGER NULL,
    `notificacao` BOOLEAN NOT NULL,
    `carroceriaId` VARCHAR(191) NOT NULL,
    `veiculoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Caminhoneiro_email_key`(`email`),
    UNIQUE INDEX `Caminhoneiro_carroceriaId_key`(`carroceriaId`),
    UNIQUE INDEX `Caminhoneiro_veiculoId_key`(`veiculoId`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Especie` (
    `id` VARCHAR(191) NOT NULL,
    `especie` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Especie_especie_key`(`especie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Frete` (
    `id` VARCHAR(191) NOT NULL,
    `cidade_origem` VARCHAR(191) NOT NULL,
    `cidade_destino` VARCHAR(191) NOT NULL,
    `estado_origem` VARCHAR(191) NOT NULL,
    `estado_destino` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `forma_pagamento` VARCHAR(191) NULL,
    `produto` VARCHAR(191) NULL,
    `preco` VARCHAR(191) NOT NULL,
    `peso` VARCHAR(191) NULL,
    `porcentagem_adiantamento` VARCHAR(191) NULL,
    `tipo_carga` VARCHAR(191) NULL,
    `data_postagem` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_coleta` DATETIME(3) NOT NULL,
    `data_entrega` DATETIME(3) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `agenciamento` BOOLEAN NULL,
    `lona` BOOLEAN NULL,
    `pedagio` BOOLEAN NULL,
    `rastreamento` BOOLEAN NULL,
    `empresaId` INTEGER NOT NULL,
    `especieId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veiculo_Frete` (
    `id` VARCHAR(191) NOT NULL,
    `veiculoId` VARCHAR(191) NOT NULL,
    `freteId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carroceria_Frete` (
    `id` VARCHAR(191) NOT NULL,
    `carroceriaId` VARCHAR(191) NOT NULL,
    `freteId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Procura_Fretes` (
    `id` VARCHAR(191) NOT NULL,
    `cidade_origem` VARCHAR(191) NOT NULL,
    `cidade_destino` VARCHAR(191) NULL,
    `estado_origem` VARCHAR(191) NOT NULL,
    `estado_destino` VARCHAR(191) NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `cpf` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contatos_empresa` ADD CONSTRAINT `Contatos_empresa_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`cnpj`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caminhoneiro` ADD CONSTRAINT `Caminhoneiro_carroceriaId_fkey` FOREIGN KEY (`carroceriaId`) REFERENCES `Carroceria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caminhoneiro` ADD CONSTRAINT `Caminhoneiro_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `Veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Frete` ADD CONSTRAINT `Frete_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`cnpj`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Frete` ADD CONSTRAINT `Frete_especieId_fkey` FOREIGN KEY (`especieId`) REFERENCES `Especie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Veiculo_Frete` ADD CONSTRAINT `Veiculo_Frete_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `Veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Veiculo_Frete` ADD CONSTRAINT `Veiculo_Frete_freteId_fkey` FOREIGN KEY (`freteId`) REFERENCES `Frete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carroceria_Frete` ADD CONSTRAINT `Carroceria_Frete_carroceriaId_fkey` FOREIGN KEY (`carroceriaId`) REFERENCES `Carroceria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carroceria_Frete` ADD CONSTRAINT `Carroceria_Frete_freteId_fkey` FOREIGN KEY (`freteId`) REFERENCES `Frete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procura_Fretes` ADD CONSTRAINT `Procura_Fretes_cpf_fkey` FOREIGN KEY (`cpf`) REFERENCES `Caminhoneiro`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
