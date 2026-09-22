import supabase from "../config/supabase.js";

  export const removeBook = async (id) => {
    try {
      const { error } = await supabase
        .from("books")
        .delete()
        .eq("id", id)

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(`Failed to remove book: ${error.message}`)
    }
  }

  