/*
  Warnings:

  - You are about to drop the column `DESCIPTION` on the `Generation` table. All the data in the column will be lost.
  - Added the required column `DESCRIPTION` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Generation` DROP COLUMN `DESCIPTION`,
    ADD COLUMN `DESCRIPTION` VARCHAR(191) NOT NULL,
    ADD COLUMN `MAX` INTEGER NOT NULL DEFAULT 1010,
    ADD COLUMN `MIN` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Pokelist` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(191) NOT NULL,
    `IMAGE` VARCHAR(191) NOT NULL,
    `GENERATION_ID` INTEGER NOT NULL,

    UNIQUE INDEX `Pokelist_GENERATION_ID_key`(`GENERATION_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokelistData` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `POKEMON_ID` INTEGER NOT NULL,
    `USER_ID` INTEGER NOT NULL,
    `OWN` INTEGER NOT NULL,

    UNIQUE INDEX `PokelistData_POKEMON_ID_key`(`POKEMON_ID`),
    UNIQUE INDEX `PokelistData_USER_ID_key`(`USER_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pokelist` ADD CONSTRAINT `Pokelist_GENERATION_ID_fkey` FOREIGN KEY (`GENERATION_ID`) REFERENCES `Generation`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokelistData` ADD CONSTRAINT `PokelistData_POKEMON_ID_fkey` FOREIGN KEY (`POKEMON_ID`) REFERENCES `Pokemon`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokelistData` ADD CONSTRAINT `PokelistData_USER_ID_fkey` FOREIGN KEY (`USER_ID`) REFERENCES `User`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
