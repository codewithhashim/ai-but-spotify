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
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  console.error('Missing SUPABASE_SECRET_KEY or VITE_SUPABASE_URL in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});
const songsDirectory = path.join(__dirname, 'public', 'songs');

// Base URL of your public R2 bucket (no trailing slash)
const STORAGE_BASE_URL = process.env.STORAGE_BASE_URL || 'https://bcsrmcscwghqfsldbgpy.supabase.co/storage/v1/object/public/ahmusic';

const albums = [
  { id: 1, name: 'Top 50 India', image_url: `${STORAGE_BASE_URL}/public/album-images/india.png`, tags: ['r&b', 'soul', 'pop', 'ballad'] },
  { id: 2, name: 'Trending World', image_url: `${STORAGE_BASE_URL}/public/album-images/trending-world.png`, tags: ['electronic', 'dance', 'pop', 'funk'] },
  { id: 3, name: 'Mega Hits', image_url: `${STORAGE_BASE_URL}/public/album-images/mega-hits.png`, tags: ['hip-hop', 'rap', 'rock', 'energetic'] },
  { id: 4, name: 'Classic Collection', image_url: `${STORAGE_BASE_URL}/public/album-images/album.bild.png`, tags: ['funk', 'soul', 'pop', 'anthem'] },
  { id: 5, name: 'Trending India', image_url: `${STORAGE_BASE_URL}/public/album-images/trending-india.png`, tags: ['dance', 'electronic', 'pop', 'emotional'] },
  { id: 6, name: 'Happy Vibes', image_url: `${STORAGE_BASE_URL}/public/album-images/happy.png`, tags: ['pop', 'upbeat', 'reggaeton', 'latin', 'disco'] }
];

// Map specific filenames to album IDs. Any file not listed here will fall back to defaultAlbumId.
const songToAlbumMap = {
  // Album 1 – Top 50 India
  'Velvet_Hours_sza.mp3': 1,
  'Fall_Again_Sam_Smith.mp3': 1,

  // Album 2 – Trending World
  'Late_Night_Lights_The Robot Mechanics.mp3': 2,
  'Shadow_Game_Justin_TimberCornflakes.mp3': 2,

  // Album 3 – Mega Hits
  'kingcode.mp3': 3,
  'Fuel_the_Fire_ADHD.mp3': 3,

  // Album 4 – Classic Collection
  'Moonlight Groove -Robot Jackson.mp3': 4,
  'The_power_of_us_MustardGarrix.mp3': 4,

  // Album 5 – Trending India
  'chasing_light.mp3': 5,
  'echo_in_my_heart.mp3': 5,

  // Album 6 – Happy Vibes
  'Magic_Trick_MNM.mp3': 6,
  'dale_toda.mp3': 6,
  'Electric_Heartbeat_Tripple_Lipa.mp3': 6
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

    const imageFiles = fs.readdirSync(path.join(__dirname, 'public', 'song-images'))
      .filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png'))
      .sort();

    const validFiles = files.filter((file) => file !== 'sample.mp3' && file.endsWith('.mp3'));

    const getRandomAlbumId = () => {
      const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
      return randomAlbum.id;
    };

    for (const [index, file] of validFiles.entries()) {
        const imageFile = imageFiles[index % imageFiles.length];

        // Derive name & artist: filename may use underscores; replace with spaces
        const base = file.replace('.mp3', '').replace(/_/g, ' ');
        const [namePart, artistPart] = base.split(' -');
        const name = namePart ? namePart.trim() : 'Untitled';
        const artist = artistPart ? artistPart.trim() : 'Unknown Artist';

        const albumId = songToAlbumMap[file] || getRandomAlbumId();
        if (!songToAlbumMap[file]) {
          console.warn(`No album mapping for "${file}". Assigned to random album (${albumId}).`);
        }
        const album = albums.find(a => a.id === albumId);
        
        const filePath = path.join(songsDirectory, file);
        const metadata = await mm.parseFile(filePath);
        const duration = formatDuration(metadata.format.duration);

        songsToInsert.push({
          name,
          artist,
          album_id: albumId,
          file_url: `${STORAGE_BASE_URL}/public/songs/${encodeURIComponent(file)}`,
          image_url: `${STORAGE_BASE_URL}/public/song-images/${imageFile}`,
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