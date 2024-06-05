/*
  Warnings:

  - You are about to alter the column `verificationToken` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - A unique constraint covering the columns `[verificationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verificationToken" SET DATA TYPE VARCHAR(64);

-- CreateIndex
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");
