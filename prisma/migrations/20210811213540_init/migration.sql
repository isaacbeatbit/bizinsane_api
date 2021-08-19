-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNDEFINED');

-- CreateEnum
CREATE TYPE "Privilege" AS ENUM ('SUPER_USER', 'SUPER_STAFF', 'CUSTOMER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "avatar" VARCHAR(250),
    "birthDate" TIMESTAMP(3),
    "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(50),
    "gender" "Gender" NOT NULL DEFAULT E'UNDEFINED',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastName" VARCHAR(50),
    "password" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(50),
    "privilege" "Privilege" NOT NULL DEFAULT E'CUSTOMER',
    "username" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
