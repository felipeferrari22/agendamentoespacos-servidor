/*
  Warnings:

  - Added the required column `telefone` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `solicitacao_espaco_id_fkey` ON `solicitacao`;

-- DropIndex
DROP INDEX `solicitacao_usuario_id_fkey` ON `solicitacao`;

-- AlterTable
ALTER TABLE `admin` ADD COLUMN `telefone` VARCHAR(191) NOT NULL;
