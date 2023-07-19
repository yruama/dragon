/*
  Warnings:

  - Made the column `POKEMON_ID` on table `EVOLUTION` required. This step will fail if there are existing NULL values in that column.
  - Made the column `CHAIN_ID` on table `EVOLUTION` required. This step will fail if there are existing NULL values in that column.
  - Made the column `LEVEL` on table `EVOLUTION` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `EVOLUTION` MODIFY `POKEMON_ID` INTEGER NOT NULL,
    MODIFY `CHAIN_ID` INTEGER NOT NULL,
    MODIFY `LEVEL` INTEGER NOT NULL;
