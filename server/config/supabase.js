import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY

const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);

export default supabase;