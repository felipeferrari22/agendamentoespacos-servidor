-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuario_nome_key`(`nome`),
    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `espaco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `ponto_referencia` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    UNIQUE INDEX `espaco_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `solicitacao` (
    `numero_solicitacao` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `espaco` VARCHAR(191) NOT NULL,
    `espaco_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    UNIQUE INDEX `solicitacao_status_key`(`status`),
    UNIQUE INDEX `solicitacao_data_hora_key`(`data_hora`),
    UNIQUE INDEX `solicitacao_espaco_key`(`espaco`),
    PRIMARY KEY (`numero_solicitacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `perfil_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `solicitacao` ADD CONSTRAINT `solicitacao_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `solicitacao` ADD CONSTRAINT `solicitacao_espaco_id_fkey` FOREIGN KEY (`espaco_id`) REFERENCES `espaco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
