import supabase from "../config/supabase.js"

export const fetchBook = async ({ tags, limit = 10, status = "published", page = 0 } = {}) => {
  try {
    
    const from = page * limit;
    const to = from + limit - 1;

    let bookIds = null;
   
    if (tags && tags.length > 0) {
      const { data: taggedBooks, error: tagError } = await supabase
        .from("book_tags")
        .select("book_id, tags!inner(name)")
        .in('tags.name', tags)

      if (tagError) {
        throw new Error(tagError.message);
      }

      bookIds = taggedBooks.map(bt => bt.book_id)
    
      if (bookIds.length === 0) return { books: [], totalPages: 0}
    }

    let query = supabase
      .from('books')
      .select('*', { count: 'exact'})
      .eq('status', status)
      .order('created_at', {ascending: false})
      .range(from, to)

      if (bookIds) query = query.in('id', bookIds)

      const { data: books, error, count } = await query;

      if (error) throw new Error(error.message);

      const ids = books.map(book => book.id);

      const { data: bookTags, error: bookTagsError } = await supabase
        .from('book_tags')
        .select('book_id, tags(name)')
        .in('book_id', ids)

      if (bookTagsError) throw new Error(bookTagsError.message);

      const bookWithTags = books.map(book => ({
        ...book,
        tags: bookTags
          .filter(bt => bt.book_id === book.id)
          .map(bt => bt.tags.name)
      }))

      return {
        books: bookWithTags,
        totalPages: Math.ceil(count / limit)
      };
    
  } catch (error) {
      throw new Error(error.message);
  }
}

export const fetchBookRankings = async (limit = 50) => {
  try {
  const { data, error} = await supabase
    .from("book_rankings")
    .select("*, books(title, cover_image)")
    .order("rank", { ascending: true })
    .limit(limit)

  if (error) {
    throw new Error(error.message)
  }

  return data;

  } catch (error) {
    throw new Error(`Failed to fetch Book Rankings ${error.message}`);
  }
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