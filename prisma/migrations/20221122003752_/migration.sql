-- AlterTable
ALTER TABLE `tb_frete` ADD COLUMN `nm_cidade_destino` VARCHAR(191) NULL,
    ADD COLUMN `nm_cidade_origem` VARCHAR(191) NULL,
    ADD COLUMN `sg_estado_destino` VARCHAR(191) NULL,
    ADD COLUMN `sg_estado_origem` VARCHAR(191) NULL;
