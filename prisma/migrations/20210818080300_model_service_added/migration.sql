-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(250) NOT NULL,
    "image" VARCHAR(250) NOT NULL,
    "overview" JSONB NOT NULL,
    "price" MONEY NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service.name_unique" ON "Service"("name");
