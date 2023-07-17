/*
  Warnings:

  - Added the required column `TOTAL` to the `POKELIST` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POKELIST` ADD COLUMN `TOTAL` INTEGER NOT NULL;
