/*
  Warnings:

  - You are about to drop the column `admin_id` on the `solicitacao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `solicitacao` DROP FOREIGN KEY `solicitacao_admin_id_fkey`;

-- AlterTable
ALTER TABLE `solicitacao` DROP COLUMN `admin_id`;
