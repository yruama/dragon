/*
  Warnings:

  - You are about to drop the column `TALENT_ID` on the `POKEMON` table. All the data in the column will be lost.
  - You are about to drop the column `TYPE_ID` on the `POKEMON` table. All the data in the column will be lost.
  - Added the required column `TALENT` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TYPE_ID_1` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TYPE_ID_2` to the `POKEMON` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `POKEMON` DROP FOREIGN KEY `POKEMON_CATEGORY_ID_fkey`;

-- DropForeignKey
ALTER TABLE `POKEMON` DROP FOREIGN KEY `POKEMON_SHAPE_ID_fkey`;

-- DropForeignKey
ALTER TABLE `POKEMON` DROP FOREIGN KEY `POKEMON_TALENT_ID_fkey`;

-- DropForeignKey
ALTER TABLE `POKEMON` DROP FOREIGN KEY `POKEMON_TYPE_ID_fkey`;

-- AlterTable
ALTER TABLE `POKEMON` DROP COLUMN `TALENT_ID`,
    DROP COLUMN `TYPE_ID`,
    ADD COLUMN `TALENT` VARCHAR(191) NOT NULL,
    ADD COLUMN `TYPE_ID_1` INTEGER NOT NULL,
    ADD COLUMN `TYPE_ID_2` INTEGER NOT NULL;
