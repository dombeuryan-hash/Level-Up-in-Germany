-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bioDe" TEXT DEFAULT '',
    "bioEn" TEXT DEFAULT '',
    "bioFr" TEXT DEFAULT '',
    "linkedin" TEXT DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "team_members_name_key" ON "team_members"("name");
