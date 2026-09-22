import supabase from "../config/supabase.js";

  export const practice = async (published) => {
    try {
      let query = supabase
        .from("books")
        .select('*, ratings(stars.avg())')
        .eq("status", published)

        const { data, error } = await query;

         if (error) {
          throw new Error(error.message)
        }
        return data;
        
        
    } catch {
      throw new Error(error.message);
    }
  }

  export const practice2 = async () => {
    try {
      let query = supabase
        .from("books")
        .select('*, book_rankings(views_this_week)')
        .order('views_this_week', {ascending: false})
        .limit(10)


      const { data, error } = await query;

      if (error) {
        throw new Error(error.message)
      }

      return data;

    } catch (error) {
      throw new Error(error.message)
    }
  }

  