/*
  Warnings:

  - Added the required column `POKELIST_ID` to the `PokelistData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PokelistData` ADD COLUMN `POKELIST_ID` INTEGER NOT NULL;
