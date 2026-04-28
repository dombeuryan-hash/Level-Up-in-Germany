-- CreateTable
CREATE TABLE "communication_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "is_communication_mode_active" BOOLEAN NOT NULL DEFAULT false,
    "popup_delay_seconds" INTEGER NOT NULL DEFAULT 5,
    "title" TEXT NOT NULL DEFAULT 'Something is coming...',
    "description" TEXT NOT NULL DEFAULT 'Be among the first to receive updates about the next Level Up event.',
    "button_text" TEXT NOT NULL DEFAULT 'Join the list',
    "event_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "communication_settings_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "event_communication_leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "subscriber_id" TEXT,
    "source" TEXT NOT NULL DEFAULT 'event_communication_popup',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "event_communication_leads_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "event_communication_leads_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "newsletter_subscribers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "communication_settings_event_id_key" ON "communication_settings"("event_id");

-- CreateIndex
CREATE INDEX "event_communication_leads_subscriber_id_idx" ON "event_communication_leads"("subscriber_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_communication_leads_event_id_email_key" ON "event_communication_leads"("event_id", "email");
