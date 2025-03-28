/*
  Warnings:

  - You are about to alter the column `carType` on the `Ride` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Ride` MODIFY `carType` ENUM('SEDAN', 'SUV', 'HATCHBACK', 'TRUCK') NOT NULL;
