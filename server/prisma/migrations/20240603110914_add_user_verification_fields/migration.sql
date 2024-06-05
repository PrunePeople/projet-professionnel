-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reservationDate" TIMESTAMP(3) NOT NULL,
    "reservationTime" TIMESTAMP(3) NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "additionalInfo" TEXT,
    "validationStatus" TEXT NOT NULL DEFAULT 'pending',
    "validatedBy" INTEGER,
    "validatedAt" TIMESTAMP(3),
    "animals" BOOLEAN NOT NULL DEFAULT false,
    "stroller" BOOLEAN NOT NULL DEFAULT false,
    "wheelchair" BOOLEAN NOT NULL DEFAULT false,
    "highChair" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
