/*
  Warnings:

  - You are about to drop the column `NAME` on the `POKEMON` table. All the data in the column will be lost.
  - You are about to drop the column `STATISTICS` on the `POKEMON` table. All the data in the column will be lost.
  - Added the required column `CATEGORY_ID` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAME_EN` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAME_FR` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TYPE_ID` to the `POKEMON` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POKEMON` DROP COLUMN `NAME`,
    DROP COLUMN `STATISTICS`,
    ADD COLUMN `CATEGORY_ID` INTEGER NOT NULL,
    ADD COLUMN `NAME_EN` VARCHAR(191) NOT NULL,
    ADD COLUMN `NAME_FR` VARCHAR(191) NOT NULL,
    ADD COLUMN `TYPE_ID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CATEGORY` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME_FR` VARCHAR(191) NOT NULL,
    `NAME_EN` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TYPE` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME_FR` VARCHAR(191) NOT NULL,
    `NAME_EN` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `POKEMON` ADD CONSTRAINT `POKEMON_CATEGORY_ID_fkey` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `CATEGORY`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POKEMON` ADD CONSTRAINT `POKEMON_TYPE_ID_fkey` FOREIGN KEY (`TYPE_ID`) REFERENCES `TYPE`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
