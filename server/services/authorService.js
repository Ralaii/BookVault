  import supabase from "../config/supabase.js";

  export const updateBookChapter = async (bookId, chapter) => {
    try {
      const { data, error } = await supabase
        .from("chapters")
        .insert([{...chapter, book_id: bookId}])
        .select()
        .single()

        if (error) {
          throw new Error(error.message);
        }

    return data;

    } catch (error) {
        throw new Error(`Failed to update book: ${error.message}`); 
    }
  }
  
  export const createBook = async (bookData) => {
    try {
      let query = supabase
        .from("books")
        .insert([bookData])
        .select()
        .single()

        const { data, error } = await query;
          if (error) {
            throw new Error(error.message);
          }
        return data;

    } catch (error) {
      throw new Error(`Failed to Create Book: ${error.message}`);
    }
  }