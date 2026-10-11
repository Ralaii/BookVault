import { relations } from "drizzle-orm/relations";
import { usersInAuth, users, authors, books, bookAuthors, tags, bookTags, notifications, bookRankings, chapters, settings, banners, ratings, bookmarks, comments } from "../src/lib/schema";

export const usersRelations = relations(users, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [users.id],
		references: [usersInAuth.id]
	}),
	authors: many(authors),
	books: many(books),
	tags: many(tags),
	notifications: many(notifications),
	settings: many(settings),
	banners: many(banners),
	ratings: many(ratings),
	bookmarks: many(bookmarks),
	comments: many(comments),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	users: many(users),
}));

export const authorsRelations = relations(authors, ({one, many}) => ({
	user: one(users, {
		fields: [authors.userId],
		references: [users.id]
	}),
	bookAuthors: many(bookAuthors),
}));

export const booksRelations = relations(books, ({one, many}) => ({
	user: one(users, {
		fields: [books.createdBy],
		references: [users.id]
	}),
	bookAuthors: many(bookAuthors),
	bookTags: many(bookTags),
	bookRankings: many(bookRankings),
	chapters: many(chapters),
	banners: many(banners),
	ratings: many(ratings),
	bookmarks: many(bookmarks),
	comments: many(comments),
}));

export const bookAuthorsRelations = relations(bookAuthors, ({one}) => ({
	author: one(authors, {
		fields: [bookAuthors.authorId],
		references: [authors.id]
	}),
	book: one(books, {
		fields: [bookAuthors.bookId],
		references: [books.id]
	}),
}));

export const tagsRelations = relations(tags, ({one, many}) => ({
	user: one(users, {
		fields: [tags.createdBy],
		references: [users.id]
	}),
	bookTags: many(bookTags),
}));

export const bookTagsRelations = relations(bookTags, ({one}) => ({
	book: one(books, {
		fields: [bookTags.bookId],
		references: [books.id]
	}),
	tag: one(tags, {
		fields: [bookTags.tagId],
		references: [tags.id]
	}),
}));

export const notificationsRelations = relations(notifications, ({one}) => ({
	user: one(users, {
		fields: [notifications.userId],
		references: [users.id]
	}),
}));

export const bookRankingsRelations = relations(bookRankings, ({one}) => ({
	book: one(books, {
		fields: [bookRankings.bookId],
		references: [books.id]
	}),
}));

export const chaptersRelations = relations(chapters, ({one}) => ({
	book: one(books, {
		fields: [chapters.bookId],
		references: [books.id]
	}),
}));

export const settingsRelations = relations(settings, ({one}) => ({
	user: one(users, {
		fields: [settings.updatedBy],
		references: [users.id]
	}),
}));

export const bannersRelations = relations(banners, ({one}) => ({
	book: one(books, {
		fields: [banners.bookId],
		references: [books.id]
	}),
	user: one(users, {
		fields: [banners.createdBy],
		references: [users.id]
	}),
}));

export const ratingsRelations = relations(ratings, ({one}) => ({
	user: one(users, {
		fields: [ratings.userId],
		references: [users.id]
	}),
	book: one(books, {
		fields: [ratings.bookId],
		references: [books.id]
	}),
}));

export const bookmarksRelations = relations(bookmarks, ({one}) => ({
	book: one(books, {
		fields: [bookmarks.bookId],
		references: [books.id]
	}),
	user: one(users, {
		fields: [bookmarks.userId],
		references: [users.id]
	}),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	book: one(books, {
		fields: [comments.bookId],
		references: [books.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));