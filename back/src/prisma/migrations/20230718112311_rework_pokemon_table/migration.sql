/*
  Warnings:

  - Added the required column `TALENT` to the `POKEMON` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POKEMON` ADD COLUMN `TALENT` VARCHAR(191) NOT NULL;
