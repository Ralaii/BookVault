import { supabase } from "../config/supabase.js"
import { books, banners, tags, bookTags } from "../src/lib/schema.js"
import { db } from "../config/db.js";
import { eq, sql, asc } from 'drizzle-orm';
import { group } from "node:console";

export const getBookById = async (id) => {
  try {
    const bookPage = await db
      .select({
        id: books.id,
        cover_image: books.coverImage,
        book_title: books.title,
      })
      .from(banners)
      .innerJoin(books, eq(banners.bookId, books.id))

    return bookPage;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getBanner = async () => {
  return db
    .select({
      id: books.id,
      title: books.title,
      cover_image: books.coverImage,
      description: books.description,
      tags: sql`coalesce(array_agg(${tags.name}) filter (where ${tags.name} is not null), '{}')`,
    })
    .from(banners)
    .innerJoin(books, eq(banners.bookId, books.id))
    .leftJoin(bookTags, eq(bookTags.bookId, books.id))
    .leftJoin(tags, eq(bookTags.tagId, tags.id))
    .where(eq(books.status, 'published'))
    .groupBy(banners.id, banners.position, books.id)
    .orderBy(asc(banners.position));
};

export const getChapterById = async (id, user) => {
  try {
    let query = supabase
      .from('chapters')
      .select(`title, content, chap_number`)
      .eq('id', id)
      .single()

    return handleSupabase(await query)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getBooksWithTag = async ({from, to, status, bookIds = null}) => {
  try {
    const bookWithTag = await db
      .select({
        id: books.id,
        title: books.title,
        cover_image: books.coverImage,
        tags: tags.name,
      })
      .from(bookTags)
      .innerJoin(bookTags, eq(bookTags, eq(bookTags.id, books.id)))
      .innerJoin(tags, eq(bookTags.tagId, tags.id))
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getBookRankings = async (limit = 10) => {
  try {
    const rankings = await prisma.book_rankings.findMany({
      orderBy: { rank: 'asc' },
      take: limit,
      include: {
        books: {
          select: {
            title: true,
            cover_image: true
          }
        }
      }
    });
    return rankings;
  } catch (error) {
    throw new Error(error.message);
  }
}