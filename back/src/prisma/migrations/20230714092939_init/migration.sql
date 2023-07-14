/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Pokemon` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `POKEMON_ID` INTEGER NOT NULL,
    `NAME` VARCHAR(191) NOT NULL,
    `GENERATION_ID` INTEGER NOT NULL,
    `INFORMATIONS_ID` INTEGER NOT NULL,
    `SPRITES_ID` INTEGER NOT NULL,
    `STATISTICS` VARCHAR(191) NOT NULL,
    `EVOLUTION` INTEGER NULL DEFAULT -1,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Generation` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(191) NOT NULL,
    `DESCIPTION` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Informations` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `HEIGHT` VARCHAR(191) NOT NULL,
    `CATEGORY` VARCHAR(191) NOT NULL,
    `TALENT` VARCHAR(191) NOT NULL,
    `WEIGHT` VARCHAR(191) NOT NULL,
    `SEXE` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sprites` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `URL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
