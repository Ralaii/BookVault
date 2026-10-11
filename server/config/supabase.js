import { createClient } from "@supabase/supabase-js";

const opts = { auth: { persistSession: false, autoRefreshToken: false }}
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY
const supabaseSecretKey = process.env.PRIVATE_SUPABASE_SECRET_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
  opts
);

export const adminSupabase = createClient(
  supabaseUrl,
  supabaseSecretKey,
  opts
);

export const createAuthClient = () =>
  createClient(supabaseUrl, supabasePublishableKey, opts);