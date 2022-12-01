/*
  Warnings:

  - You are about to drop the column `data_hora` on the `solicitacao` table. All the data in the column will be lost.
  - Added the required column `data` to the `solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_entrada` to the `solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_saida` to the `solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `solicitacao_data_hora_key` ON `solicitacao`;

-- DropIndex
DROP INDEX `solicitacao_espaco_key` ON `solicitacao`;

-- DropIndex
DROP INDEX `solicitacao_status_key` ON `solicitacao`;

-- AlterTable
ALTER TABLE `solicitacao` DROP COLUMN `data_hora`,
    ADD COLUMN `data` VARCHAR(191) NOT NULL,
    ADD COLUMN `hora_entrada` VARCHAR(191) NOT NULL,
    ADD COLUMN `hora_saida` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL;
