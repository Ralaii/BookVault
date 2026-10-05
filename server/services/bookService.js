import { supabase } from "../config/supabase.js"
import { getBookById, getBookIdsByTag, getBookRankings, getBooksWithTag } from "../repository/book.js";

export const fetchBook = async ({ tags, limit = 10, status = "published", page = 0 } = {}) => {
  const MAX_LIMIT = 100;
  const safeLimit = Math.min(limit, MAX_LIMIT)
  const safePage = Math.max(page, 0)
  const from = safePage * safeLimit;
  const to = from + safeLimit - 1;

  let bookIds = null;
  
  if (tags && tags.length > 0) {
    bookIds = await getBookIdsByTag(tags);
    if (bookIds.length === 0) return { books: [], totalPages: 0}
  }

  const { data: books, count } = await getBooksWithTag({from, to, status, bookIds });
  const booksWithTags = books.map(({book_tags, ...book}) => ({
    ...book,
    tags: book_tags.map(bt => bt.tags.name)
  }))

  return {
    books: booksWithTags,
    totalPages: Math.ceil(count / safeLimit)
  }
}

export const fetchBookRankings = async (limit = 50) => {
  const data = await getBookRankings(limit);
  return data;
}

export const fetchBanner = async () => {
  try {
    const { data: setting, error: settingError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'banner_limit')
      .single()

    if (settingError) throw new Error(setting.message);

    const limit = parseInt(setting.value) || 10;
    return fetchBookRankings(limit);
    
  } catch (error) {
    throw new Error(error.message);
  }
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

export const fetchTags = async () => {
  try {
    const { data, error} = await supabase
      .from("tags")
      .select("id, name")

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message)
  }
}

export const bookPageService = async (id) => {
  const result = await getBookById(id);
  const { book_authors, ...page} = result.data
  const author = book_authors[0]
  page.author = author.authors.users.username;
  page.bio = author.authors.bio
  return page;
};
  