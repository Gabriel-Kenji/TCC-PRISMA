/*
  Warnings:

  - Added the required column `ativo` to the `tb_procura_fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especieId` to the `tb_procura_fretes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_procura_fretes` ADD COLUMN `agenciamento` BOOLEAN NULL,
    ADD COLUMN `ativo` BOOLEAN NOT NULL,
    ADD COLUMN `especieId` INTEGER NOT NULL,
    ADD COLUMN `lona` BOOLEAN NULL,
    ADD COLUMN `pedagio` BOOLEAN NULL,
    ADD COLUMN `rastramento` BOOLEAN NULL;
