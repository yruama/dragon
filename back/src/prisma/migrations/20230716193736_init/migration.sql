-- DropForeignKey
ALTER TABLE `Pokelist` DROP FOREIGN KEY `Pokelist_GENERATION_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Pokelist` DROP FOREIGN KEY `Pokelist_USER_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PokelistData` DROP FOREIGN KEY `PokelistData_POKEMON_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PokelistData` DROP FOREIGN KEY `PokelistData_USER_ID_fkey`;
