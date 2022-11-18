-- CreateTable
CREATE TABLE `usuario_e_perfil` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfil_id` INTEGER NOT NULL,

    UNIQUE INDEX `usuario_e_perfil_perfil_id_key`(`perfil_id`),
    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario_e_perfil` ADD CONSTRAINT `usuario_e_perfil_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_e_perfil` ADD CONSTRAINT `usuario_e_perfil_perfil_id_fkey` FOREIGN KEY (`perfil_id`) REFERENCES `perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
