-- AlterTable
ALTER TABLE "team_members" ADD COLUMN "imageUrl" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "media_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'general',
    "size" INTEGER,
    "mimeType" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
