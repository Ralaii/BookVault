  import supabase from "../config/supabase";

  export const fetchNotifications = async (id, notifications) => {
    try {
      let query = supabase
        .from("users")
        .select("*, users(id, name)")
        .eq("id", id)

      const { data, error } = await query;
      if (error) {
        throw new Error(error.message)
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to Fetch ${notifications}`)
    }
  }