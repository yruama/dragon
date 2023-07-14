/*
  Warnings:

  - You are about to alter the column `NAME` on the `Pokemon` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `STATISTICS` on the `Pokemon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.
  - You are about to alter the column `INFORMATIONS` on the `Pokemon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `Pokemon` MODIFY `NAME` JSON NOT NULL,
    MODIFY `STATISTICS` JSON NOT NULL,
    MODIFY `INFORMATIONS` JSON NOT NULL;
