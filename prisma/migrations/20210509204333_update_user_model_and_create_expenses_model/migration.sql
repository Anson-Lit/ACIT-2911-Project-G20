-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
