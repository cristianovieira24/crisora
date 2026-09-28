CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`url` text DEFAULT '' NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT 1 NOT NULL
);
