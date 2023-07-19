/*
  Warnings:

  - Added the required column `COLOR` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DESCRIPTION_EN` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DESCRIPTION_FR` to the `POKEMON` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DESCRIPTION_EN` to the `TALENT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DESCRIPTION_FR` to the `TALENT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `POKEMON` ADD COLUMN `COLOR` VARCHAR(191) NOT NULL,
    ADD COLUMN `DESCRIPTION_EN` VARCHAR(191) NOT NULL,
    ADD COLUMN `DESCRIPTION_FR` VARCHAR(191) NOT NULL,
    MODIFY `EVOLUTION` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `TALENT` ADD COLUMN `DESCRIPTION_EN` VARCHAR(191) NOT NULL,
    ADD COLUMN `DESCRIPTION_FR` VARCHAR(191) NOT NULL;
