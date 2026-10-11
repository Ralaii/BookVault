import { supabase } from "../config/supabase.js"
import { getBanner, getBookById, getBookRankings, getBooksWithTag } from "../repository/bookRepo.js";
import { getTags } from "../repository/tagRepo.js";
import { findOrThrow } from "../utils/findOrThrow.js";
import { withCache } from "../utils/cache.js";

export const fetchBook = async () => {
  return getBanner();
}

export const fetchBookRankings = async (limit = 50) => {
  const data = await getBookRankings(limit);
  return data;
}

export const fetchBanner = async () => {
  const banner = await getBanner();
  return banner;
}

export const fetchNewRelease = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', {ascending: false})

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error.message)
  }
}

// export const fetchTags = async () => (await getTags());

export const fetchTags = async () => (await withCache('tags', 60 * 3, getTags))

export const bookPageService = async (id) => {
  const result = await getBookById(id);
  const { book_authors, ...page} = result
  const author = book_authors[0]
  page.author = author.authors.users.username;
  page.bio = author.authors.bio
  return page;
};
  