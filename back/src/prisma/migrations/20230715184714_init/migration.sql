/*
  Warnings:

  - A unique constraint covering the columns `[POKEMON_ID]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `User` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `LASTNAME` VARCHAR(191) NOT NULL,
    `FIRSTNAME` VARCHAR(191) NOT NULL,
    `EMAIL` VARCHAR(191) NOT NULL,
    `PASSWORD` VARCHAR(191) NOT NULL,
    `USERNAME` VARCHAR(191) NOT NULL,
    `UUID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Pokemon_POKEMON_ID_key` ON `Pokemon`(`POKEMON_ID`);
