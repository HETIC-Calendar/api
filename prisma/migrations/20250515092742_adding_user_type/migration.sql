-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PLANNER', 'SPEAKER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'SPEAKER';
