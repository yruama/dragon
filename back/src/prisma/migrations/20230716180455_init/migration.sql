/*
  Warnings:

  - Added the required column `NOTE` to the `PokelistData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PokelistData` ADD COLUMN `NOTE` VARCHAR(191) NOT NULL;
