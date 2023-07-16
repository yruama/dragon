/*
  Warnings:

  - You are about to drop the column `OWN` on the `PokelistData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[USER_ID]` on the table `Pokelist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `USER_ID` to the `Pokelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OWNED` to the `PokelistData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pokelist` ADD COLUMN `USER_ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PokelistData` DROP COLUMN `OWN`,
    ADD COLUMN `OWNED` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pokelist_USER_ID_key` ON `Pokelist`(`USER_ID`);

-- AddForeignKey
ALTER TABLE `Pokelist` ADD CONSTRAINT `Pokelist_USER_ID_fkey` FOREIGN KEY (`USER_ID`) REFERENCES `User`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
