/*
  Warnings:

  - You are about to alter the column `RELATIVE_PHYSICAL_STATS` on the `EVOLUTION` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `EVOLUTION` MODIFY `RELATIVE_PHYSICAL_STATS` INTEGER NULL;
