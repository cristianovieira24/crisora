import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const projects=sqliteTable('projects',{id:text('id').primaryKey(),title:text('title').notNull(),category:text('category').notNull(),description:text('description').notNull(),image:text('image').notNull(),url:text('url').notNull().default(''),position:integer('position').notNull().default(0),featured:integer('featured').notNull().default(1),published:integer('published').notNull().default(1)});

export const siteSettings=sqliteTable('site_settings',{id:text('id').primaryKey(),value:text('value').notNull()});
