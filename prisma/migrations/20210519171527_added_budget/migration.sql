/*
  Warnings:

  - Added the required column `budget` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "budget" INTEGER NOT NULL
);
INSERT INTO "new_users" ("id", "email", "password", "Created_at", "updated_at") SELECT "id", "email", "password", "Created_at", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
