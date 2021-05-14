/*
  Warnings:

  - Added the required column `tags` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_expenses" ("id", "date", "transaction", "cost", "userId") SELECT "id", "date", "transaction", "cost", "userId" FROM "expenses";
DROP TABLE "expenses";
ALTER TABLE "new_expenses" RENAME TO "expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
