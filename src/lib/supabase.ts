import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Hero = {
  id: string;
  title: string;
  subtitle: string;
  typing_text: string;
  background_image: string | null;
  created_at: string;
  updated_at: string;
};

export type About = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  created_at: string;
  updated_at: string;
  display_order: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
  display_order: number;
};

export type Gallery = {
  id: string;
  image_url: string;
  title: string | null;
  created_at: string;
  display_order: number;
};

export type Contact = {
  id: string;
  email: string;
  phone: string;
  location: string;
  created_at: string;
  updated_at: string;
};
