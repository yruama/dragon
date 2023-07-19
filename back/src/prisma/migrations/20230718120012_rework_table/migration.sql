/*
  Warnings:

  - Added the required column `SHAPE_ID` to the `POKEMON` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POKEMON` ADD COLUMN `SHAPE_ID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SHAPE` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `POKEMON` ADD CONSTRAINT `POKEMON_SHAPE_ID_fkey` FOREIGN KEY (`SHAPE_ID`) REFERENCES `SHAPE`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
