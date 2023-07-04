import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://hsziajzqkyiehezccnvx.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzemlhanpxa3lpZWhlemNjbnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1MDY0NDksImV4cCI6MTk5ODA4MjQ0OX0.PeeyVVHz7SgjGg7eBFsCDFvPzT_EeH0bexVhK9x1FO4";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});
