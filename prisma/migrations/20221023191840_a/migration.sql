-- CreateTable
CREATE TABLE `tb_empresa` (
    `cnpj` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `imagem_perfil` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_empresa_email_key`(`email`),
    PRIMARY KEY (`cnpj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_contatos_empresa` (
    `id` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `telegram` VARCHAR(191) NULL,
    `empresaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_contatos_empresa_empresaId_key`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_caminhoneiro` (
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NULL,
    `notificacao` BOOLEAN NOT NULL,
    `carroceriaId` INTEGER NOT NULL,
    `veiculoId` INTEGER NOT NULL,

    UNIQUE INDEX `tb_caminhoneiro_email_key`(`email`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_frete` (
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
    `empresaId` VARCHAR(191) NOT NULL,
    `especieId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_veiculo_frete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculoId` INTEGER NOT NULL,
    `freteId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carroceria_Frete` (
    `id` VARCHAR(191) NOT NULL,
    `carroceriaId` INTEGER NOT NULL,
    `freteId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_procura_fretes` (
    `id` VARCHAR(191) NOT NULL,
    `cidade_origem` VARCHAR(191) NOT NULL,
    `cidade_destino` VARCHAR(191) NULL,
    `estado_origem` VARCHAR(191) NOT NULL,
    `estado_destino` VARCHAR(191) NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tc_especie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `especie` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tc_especie_especie_key`(`especie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tc_veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tc_veiculo_veiculo_key`(`veiculo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tc_carroceria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carroceria` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tc_carroceria_carroceria_key`(`carroceria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_contatos_empresa` ADD CONSTRAINT `tb_contatos_empresa_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `tb_empresa`(`cnpj`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_caminhoneiro` ADD CONSTRAINT `tb_caminhoneiro_carroceriaId_fkey` FOREIGN KEY (`carroceriaId`) REFERENCES `tc_carroceria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_caminhoneiro` ADD CONSTRAINT `tb_caminhoneiro_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `tc_veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_frete` ADD CONSTRAINT `tb_frete_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `tb_empresa`(`cnpj`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_frete` ADD CONSTRAINT `tb_frete_especieId_fkey` FOREIGN KEY (`especieId`) REFERENCES `tc_especie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_veiculo_frete` ADD CONSTRAINT `tb_veiculo_frete_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `tc_veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_veiculo_frete` ADD CONSTRAINT `tb_veiculo_frete_freteId_fkey` FOREIGN KEY (`freteId`) REFERENCES `tb_frete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carroceria_Frete` ADD CONSTRAINT `Carroceria_Frete_carroceriaId_fkey` FOREIGN KEY (`carroceriaId`) REFERENCES `tc_carroceria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carroceria_Frete` ADD CONSTRAINT `Carroceria_Frete_freteId_fkey` FOREIGN KEY (`freteId`) REFERENCES `tb_frete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_procura_fretes` ADD CONSTRAINT `tb_procura_fretes_cpf_fkey` FOREIGN KEY (`cpf`) REFERENCES `tb_caminhoneiro`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
