/*
  Warnings:

  - You are about to drop the column `rastramento` on the `tb_procura_fretes` table. All the data in the column will be lost.
  - You are about to alter the column `agenciamento` on the `tb_procura_fretes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `especieId` on the `tb_procura_fretes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `lona` on the `tb_procura_fretes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `pedagio` on the `tb_procura_fretes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `tb_procura_fretes` DROP COLUMN `rastramento`,
    ADD COLUMN `rastreamento` BOOLEAN NULL,
    MODIFY `agenciamento` BOOLEAN NULL,
    MODIFY `especieId` BOOLEAN NULL,
    MODIFY `lona` BOOLEAN NULL,
    MODIFY `pedagio` BOOLEAN NULL;
