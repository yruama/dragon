/*
  Warnings:

  - You are about to drop the column `CREATED_AT` on the `POKEMON` table. All the data in the column will be lost.
  - You are about to drop the column `UPDATED_AT` on the `POKEMON` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `POKEMON` DROP COLUMN `CREATED_AT`,
    DROP COLUMN `UPDATED_AT`;
