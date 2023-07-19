/*
  Warnings:

  - You are about to drop the column `CATEGORY_ID` on the `POKEMON` table. All the data in the column will be lost.
  - Added the required column `CATEGORY` to the `POKEMON` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POKEMON` DROP COLUMN `CATEGORY_ID`,
    ADD COLUMN `CATEGORY` VARCHAR(191) NOT NULL;
