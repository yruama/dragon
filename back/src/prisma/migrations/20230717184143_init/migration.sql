/*
  Warnings:

  - You are about to drop the `Generation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Informations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pokelist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PokelistData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pokemon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sprites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Pokelist` DROP FOREIGN KEY `Pokelist_USER_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PokelistData` DROP FOREIGN KEY `PokelistData_POKELIST_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PokelistData` DROP FOREIGN KEY `PokelistData_POKEMON_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PokelistData` DROP FOREIGN KEY `PokelistData_USER_ID_fkey`;

-- DropTable
DROP TABLE `Generation`;

-- DropTable
DROP TABLE `Informations`;

-- DropTable
DROP TABLE `Pokelist`;

-- DropTable
DROP TABLE `PokelistData`;

-- DropTable
DROP TABLE `Pokemon`;

-- DropTable
DROP TABLE `Sprites`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `POKEMON` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `POKEMON_ID` INTEGER NOT NULL,
    `NAME` JSON NOT NULL,
    `GENERATION` INTEGER NOT NULL,
    `INFORMATIONS` JSON NOT NULL,
    `STATISTICS` JSON NOT NULL,
    `EVOLUTION` INTEGER NULL DEFAULT -1,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,

    UNIQUE INDEX `POKEMON_POKEMON_ID_key`(`POKEMON_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `USER` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `LASTNAME` VARCHAR(191) NOT NULL,
    `FIRSTNAME` VARCHAR(191) NOT NULL,
    `EMAIL` VARCHAR(191) NOT NULL,
    `PASSWORD` VARCHAR(191) NOT NULL,
    `USERNAME` VARCHAR(191) NOT NULL,
    `UUID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GENERATION` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `GENERATION_NO` INTEGER NOT NULL,
    `NAME` VARCHAR(191) NOT NULL,
    `DESCRIPTION` VARCHAR(191) NOT NULL,
    `MIN` INTEGER NOT NULL DEFAULT 0,
    `MAX` INTEGER NOT NULL DEFAULT 1010,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `POKELIST` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(191) NOT NULL,
    `DESCRIPTION` VARCHAR(191) NOT NULL,
    `USER_ID` INTEGER NOT NULL,
    `FILTER` VARCHAR(191) NOT NULL,

    INDEX `POKELIST_USER_ID_idx`(`USER_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `POKEMON_OWNED` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `POKEMON_ID` INTEGER NOT NULL,
    `USER_ID` INTEGER NOT NULL,
    `OWNED` INTEGER NOT NULL,
    `NOTE` VARCHAR(191) NOT NULL,

    INDEX `POKEMON_OWNED_POKEMON_ID_idx`(`POKEMON_ID`),
    INDEX `POKEMON_OWNED_USER_ID_idx`(`USER_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `POKELIST` ADD CONSTRAINT `POKELIST_USER_ID_fkey` FOREIGN KEY (`USER_ID`) REFERENCES `USER`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POKEMON_OWNED` ADD CONSTRAINT `POKEMON_OWNED_POKEMON_ID_fkey` FOREIGN KEY (`POKEMON_ID`) REFERENCES `POKEMON`(`POKEMON_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POKEMON_OWNED` ADD CONSTRAINT `POKEMON_OWNED_USER_ID_fkey` FOREIGN KEY (`USER_ID`) REFERENCES `USER`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
