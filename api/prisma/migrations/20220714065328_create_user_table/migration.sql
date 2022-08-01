-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
