
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Anon Key from project settings
const supabaseUrl = 'https://kvwgvvervevgyabxfclw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2d2d2dmVydmV2Z3lhYnhmY2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzI2MjUsImV4cCI6MjA4NDA0ODYyNX0.jUeW01YlW572zYibQfsb1aCAqYaad_kwUw8zkxMlBkI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
