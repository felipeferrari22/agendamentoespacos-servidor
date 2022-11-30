/*
  Warnings:

  - Added the required column `cargo` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `cargo` VARCHAR(191) NOT NULL;
