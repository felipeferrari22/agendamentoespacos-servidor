/*
  Warnings:

  - You are about to drop the `perfil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario_e_perfil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuario_e_perfil` DROP FOREIGN KEY `usuario_e_perfil_perfil_id_fkey`;

-- DropForeignKey
ALTER TABLE `usuario_e_perfil` DROP FOREIGN KEY `usuario_e_perfil_usuario_id_fkey`;

-- DropTable
DROP TABLE `perfil`;

-- DropTable
DROP TABLE `usuario_e_perfil`;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_nome_key`(`nome`),
    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
