/*
  Warnings:

  - You are about to drop the column `TALENT` on the `POKEMON` table. All the data in the column will be lost.
  - You are about to drop the column `NAME_EN` on the `TYPE` table. All the data in the column will be lost.
  - You are about to drop the column `NAME_FR` on the `TYPE` table. All the data in the column will be lost.
  - Added the required column `TALENT_ID` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAME` to the `TYPE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POKEMON` DROP COLUMN `TALENT`,
    ADD COLUMN `TALENT_ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TYPE` DROP COLUMN `NAME_EN`,
    DROP COLUMN `NAME_FR`,
    ADD COLUMN `NAME` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TALENT` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME_FR` VARCHAR(191) NOT NULL,
    `NAME_EN` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `POKEMON` ADD CONSTRAINT `POKEMON_TALENT_ID_fkey` FOREIGN KEY (`TALENT_ID`) REFERENCES `TALENT`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
