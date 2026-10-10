/*
  Warnings:

  - Added the required column `language` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolution` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "os" TEXT NOT NULL,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "resolution" TEXT NOT NULL,
ADD COLUMN     "screen" TEXT NOT NULL,
ADD COLUMN     "size" DOUBLE PRECISION NOT NULL;
