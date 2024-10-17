/*
  Warnings:

  - Added the required column `sellerId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productUrl" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" REAL NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    CONSTRAINT "CartItem_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("cartId", "createdAt", "id", "productId", "productName", "productPrice", "productUrl", "quantity", "updatedAt") SELECT "cartId", "createdAt", "id", "productId", "productName", "productPrice", "productUrl", "quantity", "updatedAt" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
CREATE UNIQUE INDEX "CartItem_productId_key" ON "CartItem"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
