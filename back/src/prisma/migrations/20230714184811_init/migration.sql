/*
  Warnings:

  - You are about to drop the column `SEXE` on the `Informations` table. All the data in the column will be lost.
  - You are about to drop the column `TALENT` on the `Informations` table. All the data in the column will be lost.
  - You are about to drop the column `GENERATION_ID` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `INFORMATIONS_ID` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `SPRITES_ID` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `TYPE` to the `Informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GENERATION` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `INFORMATIONS` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Informations` DROP COLUMN `SEXE`,
    DROP COLUMN `TALENT`,
    ADD COLUMN `TYPE` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Pokemon` DROP COLUMN `GENERATION_ID`,
    DROP COLUMN `INFORMATIONS_ID`,
    DROP COLUMN `SPRITES_ID`,
    ADD COLUMN `GENERATION` INTEGER NOT NULL,
    ADD COLUMN `INFORMATIONS` VARCHAR(191) NOT NULL;
