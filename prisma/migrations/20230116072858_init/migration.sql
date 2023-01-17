-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "transaction_hash" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);
