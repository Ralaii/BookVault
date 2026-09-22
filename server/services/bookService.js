import supabase from "../config/supabase.js"

export const fetchBook = async ({ tag, limit = 10, status = "published", page = 0 } = {}) => {
  try {
    const from = page * limit;
    const to = from + limit - 1;
   
    const selectQuery = tag
    ? "*, book_tags!inner(tags!inner(name))"
    : "*, book_tags(tags(name))";

    let query = supabase
      .from('books')
      .select(selectQuery)
      .eq('status', status)
      .order('created_at', {ascending: false})
      .range(from, to)

      if (tag) query = query.eq("book_tags.tags.name", tag)

      const { data, error } = await query;
      if (error) throw new Error(error.message);

      return data;
    
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
    console.log(error.message);
    throw new Error(error.message);
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