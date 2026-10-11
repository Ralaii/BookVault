import { pgTable, pgSchema, foreignKey, unique, check, uuid, text, timestamp, integer, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

const auth = pgSchema("auth");

export const usersInAuth = auth.table("users", {
	id: uuid().primaryKey().notNull(),
})

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	username: text().notNull(),
	role: text().default('user'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "users_id_fkey"
		}).onDelete("cascade"),
	unique("users_email_key").on(table.email),
	unique("users_username_key").on(table.username),
	check("users_role_check", sql`role = ANY (ARRAY['user'::text, 'author'::text, 'admin'::text])`),
]);

export const authors = pgTable("authors", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	bio: text(),
	verifiedAt: timestamp("verified_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "authors_user_id_fkey"
		}).onDelete("cascade"),
]);

export const books = pgTable("books", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	coverImage: text("cover_image"),
	publishedYear: integer("published_year"),
	createdBy: uuid("created_by"),
	status: text().default('draft'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "books_created_by_fkey"
		}).onDelete("set null"),
	check("books_status_check", sql`status = ANY (ARRAY['draft'::text, 'published'::text])`),
]);

export const bookAuthors = pgTable("book_authors", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	bookId: uuid("book_id"),
	authorId: uuid("author_id"),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [authors.id],
			name: "book_authors_authors_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "book_authors_books_id_fkey"
		}).onDelete("cascade"),
]);

export const tags = pgTable("tags", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	createdBy: uuid("created_by"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "tags_created_by_fkey"
		}).onDelete("set null"),
	unique("tags_name_key").on(table.name),
]);

export const bookTags = pgTable("book_tags", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	bookId: uuid("book_id"),
	tagId: uuid("tag_id"),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "book_tags_book_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "book_tags_tag_id_fkey"
		}).onDelete("cascade"),
]);

export const notifications = pgTable("notifications", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	type: text().notNull(),
	message: text().notNull(),
	isRead: boolean("is_read").default(false),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "notifications_user_id_fkey"
		}).onDelete("cascade"),
]);

export const bookRankings = pgTable("book_rankings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	bookId: uuid("book_id"),
	viewsToday: integer("views_today").default(0),
	viewsThisWeek: integer("views_this_week").default(0),
	rank: integer(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "book_rankings_book_id_fkey"
		}).onDelete("cascade"),
	unique("book_rankings_book_id_key").on(table.bookId),
]);

export const chapters = pgTable("chapters", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	bookId: uuid("book_id"),
	title: text(),
	content: text(),
	chapNumber: integer("chap_number").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "chapters_book_id_fkey"
		}).onDelete("cascade"),
]);

export const settings = pgTable("settings", {
	key: text().primaryKey().notNull(),
	value: text().notNull(),
	updatedBy: uuid("updated_by"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [users.id],
			name: "settings_updated_by_fkey"
		}).onDelete("set null"),
]);

export const banners = pgTable("banners", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	bookId: uuid("book_id").notNull(),
	imageUrl: text("image_url"),
	position: integer().default(0).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	startsAt: timestamp("starts_at", { withTimezone: true, mode: 'string' }),
	endsAt: timestamp("ends_at", { withTimezone: true, mode: 'string' }),
	createdBy: uuid("created_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "banners_book_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "banners_created_by_fkey"
		}).onDelete("set null"),
	unique("banners_book_id_key").on(table.bookId),
]);

export const ratings = pgTable("ratings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	bookId: uuid("book_id"),
	stars: integer(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "ratings_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "ratings_book_id_fkey"
		}).onDelete("cascade"),
	check("ratings_stars_check", sql`(stars >= 1) AND (stars <= 5)`),
]);

export const bookmarks = pgTable("bookmarks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	bookId: uuid("book_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "bookmarks_book_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "bookmarks_user_id_fkey"
		}).onDelete("cascade"),
]);

export const comments = pgTable("comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	bookId: uuid("book_id"),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "comments_book_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_user_id_fkey"
		}).onDelete("cascade"),
]);
