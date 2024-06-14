-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Stadium', 'Teather', 'Other');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Futebol', 'Show', 'Other');

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "type" "LocationType" NOT NULL,
    "cnpj" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "complement" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "entrances" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "turnstiles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "locationId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_startDate_endDate_idx" ON "Event"("startDate", "endDate");

-- CreateIndex
CREATE UNIQUE INDEX "Event_startDate_endDate_locationId_key" ON "Event"("startDate", "endDate", "locationId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
