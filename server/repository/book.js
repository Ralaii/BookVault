import { supabase } from "../config/supabase.js"
import { handleSupabase } from "../utilities/handleSupabase.js";

export const getBookById = async (id) => {
  try {
    let query = supabase
      .from('books') 
      .select(`title, description, cover_image, status, 
        book_authors(authors(bio, users(username))),
        book_tags(tags(name)),
        chapters(title, id, chap_number)
      `)
      .eq('id', id)
      .single()
    return handleSupabase(await query)
  } catch (error) {
    throw new Error(error.message)
  }
}

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
    let query = supabase
      .from('books')
      .select('*, book_tags(tags(name))', { count: 'exact'})
      .eq('status', status)
      .order('created_at', {ascending: false})
      .range(from, to)

    if (bookIds) query = query.in('id', bookIds)

    return handleSupabase(await query);
}

export const getBookIdsByTag = async (tags) => {
  const result = await supabase
    .from('book_tags')
    .select('book_id, tags!inner(name)')
    .in('tags.name', tags)

    const data = handleSupabase(result)
    return data.map(bt => bt.book_id);
}

export const getBookRankings = async (limit = 10) => {
  try {
    const { data, error } = await supabase 
      .from('book_rankings')
      .select('*, books(title, cover_image)')
      .order('rank', {ascending: true})
      .limit(limit)

    if (error) throw new Error(error.message);

    return data;

  } catch (error) {
    throw new Error(error.message)
  }
}