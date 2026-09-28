CREATE TABLE `site_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `projects` ADD `featured` integer DEFAULT 1 NOT NULL;