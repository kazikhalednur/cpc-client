/*
  Warnings:

  - You are about to drop the column `type` on the `Contest` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prize` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ContestDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "type",
ADD COLUMN     "difficulty" "ContestDifficulty" NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "participants" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prize" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'UPCOMING';

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "keynoteSpeaker" TEXT NOT NULL,
    "guests" TEXT[],
    "eventDate" TIMESTAMP(3) NOT NULL,
    "registrationDeadline" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
