import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ihtxxwitdibhlocwqhoq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlodHh4d2l0ZGliaGxvY3dxaG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjM4MDIsImV4cCI6MjA3Njc5OTgwMn0.ThaJapdkbVQGy1ROYpdoSnpOVz9zkLaHW65n2yKWR74"; // Lấy từ Supabase > Project Settings > API


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
