/*
  Warnings:

  - Added the required column `admin_id` to the `solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `solicitacao` ADD COLUMN `admin_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `solicitacao` ADD CONSTRAINT `solicitacao_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
