# AquaTrack Pro

Water pipeline issue tracking system using:
- Leaflet.js + OpenStreetMap
- Supabase (PostgreSQL)
- HTML/CSS/JavaScript

## Setup
1. Create Supabase project:
   - Enable Row Level Security (RLS)
   - Create `reports` table and `photos` bucket
2. Replace in code:
   - `YOUR_SUPABASE_URL`
   - `YOUR_SUPABASE_ANON_KEY`
3. Deploy to GitHub Pages:
   - Enable Pages in repo settings
   - Set source to `/public` folder
