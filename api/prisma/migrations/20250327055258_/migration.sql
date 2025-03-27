/*
  Warnings:

  - Made the column `pickup` on table `Ride` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Ride` MODIFY `pickup` VARCHAR(191) NOT NULL;
