/*
  Warnings:

  - You are about to drop the column `speaker` on the `Talk` table. All the data in the column will be lost.
  - Added the required column `speakerId` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Talk" DROP COLUMN "speaker",
ADD COLUMN     "speakerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
