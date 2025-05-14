/*
  Warnings:

  - Added the required column `subject` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TalkStatus" AS ENUM ('PENDING_APPROVAL', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TalkSubject" AS ENUM ('AI', 'WEB_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'DATA_SCIENCE', 'CLOUD_COMPUTING', 'DEVOPS', 'CYBER_SECURITY', 'BLOCKCHAIN', 'IOT', 'GAME_DEVELOPMENT');

-- AlterTable
ALTER TABLE "Talk" ADD COLUMN     "status" "TalkStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
ADD COLUMN     "subject" "TalkSubject" NOT NULL;
