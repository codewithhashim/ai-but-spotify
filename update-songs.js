import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as mm from 'music-metadata';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const songsDirectory = path.join(__dirname, 'public', 'songs');

const albums = [
  { id: 1, name: 'Top 50 India', image_url: '/album-images/india.png', tags: ['r&b', 'soul', 'pop', 'ballad'] },
  { id: 2, name: 'Trending World', image_url: '/album-images/trending-world.png', tags: ['electronic', 'dance', 'pop', 'funk'] },
  { id: 3, name: 'Mega Hits', image_url: '/album-images/mega-hits.png', tags: ['hip-hop', 'rap', 'rock', 'energetic'] },
  { id: 4, name: 'Classic Collection', image_url: '/album-images/album.bild.png', tags: ['funk', 'soul', 'pop', 'anthem'] },
  { id: 5, name: 'Trending India', image_url: '/album-images/trending-india.png', tags: ['dance', 'electronic', 'pop', 'emotional'] },
  { id: 6, name: 'Happy Vibes', image_url: '/album-images/happy.png', tags: ['pop', 'upbeat', 'reggaeton', 'latin', 'disco'] }
];

// Map filenames to albums
const songToAlbumMap = {
  'Velvet Hours -sza.mp3': 1,
  'Fall Again -Sam Smith.mp3': 1,
  'Late Night Lights - The Robot Mechanics.mp3': 2,
  'Shadow Game -Justin TimberCornflakes.mp3': 2,
  'King’s Code -50 Dollars.mp3': 3,
  'Fuel the Fire -ADHD.mp3': 3,
  'Moonlight Groove -Robot Jackson.mp3': 4,
  'The power of us -Mustard Garrix.mp3': 4,
  'Chasing Light - David Guetta.mp3': 5,
  'Echo in My Heart.mp3': 5,
  'Magic Trick -MNM.mp3': 6,
  'Dale Toda La Noche -Bulldog.mp3': 6,
  'Electric Heartbeat Tripple Lipa.mp3': 6
};

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

async function seedSongs() {
  try {
    // Clear existing songs
    console.log('Clearing existing songs...');
    const { error: deleteError } = await supabase.from('songs').delete().neq('id', 0);
    if (deleteError) throw deleteError;
    console.log('Existing songs cleared.');

    const files = fs.readdirSync(songsDirectory);

    const songsToInsert = [];

    for (const [index, file] of files.filter(file => file !== 'sample.mp3' && songToAlbumMap[file]).entries()) {
        const [name, artist] = file.replace('.mp3', '').split(' -');
        const albumId = songToAlbumMap[file];
        const album = albums.find(a => a.id === albumId);
        
        const filePath = path.join(songsDirectory, file);
        const metadata = await mm.parseFile(filePath);
        const duration = formatDuration(metadata.format.duration);

        songsToInsert.push({
          name: name.trim(),
          artist: artist ? artist.trim() : 'Unknown Artist',
          album_id: albumId,
          file_url: `/songs/${file}`,
          image_url: album.image_url,
          description: `A track from ${album.name}`,
          duration,
          track_number: index + 1,
          tags: album.tags
        });
    }

    console.log(`Inserting ${songsToInsert.length} new songs...`);
    const { error: insertError } = await supabase.from('songs').insert(songsToInsert);
    if (insertError) throw insertError;

    console.log('Successfully seeded new songs!');
  } catch (error) {
    console.error('Error seeding songs:', error);
  }
}

seedSongs(); 