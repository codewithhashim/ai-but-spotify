import { supabase } from '../lib/supabase'

// Sample albums data using your available images
const albumsData = [
  {
    name: 'Top 50 India',
    description: 'Your weekly update of the most played tracks in India',
    image_url: '/album-images/india.png',
    bg_color: '#22543d',
    tags: ['music', 'bollywood', 'india']
  },
  {
    name: 'Trending World',
    description: 'Global hits that are trending worldwide',
    image_url: '/album-images/trending-world.png',
    bg_color: '#44337a',
    tags: ['music', 'global', 'trending']
  },
  {
    name: 'Mega Hits',
    description: 'The biggest hits of all time',
    image_url: '/album-images/mega-hits.png',
    bg_color: '#234e52',
    tags: ['music', 'hits', 'classic']
  },
  {
    name: 'Classic Collection',
    description: 'Timeless classics that never get old',
    image_url: '/album-images/album.bild.png',
    bg_color: '#1a365d',
    tags: ['music', 'classic', 'timeless']
  },
  {
    name: 'Trending India',
    description: "What's hot in India right now",
    image_url: '/album-images/trending-india.png',
    bg_color: '#742a2a',
    tags: ['music', 'india', 'trending']
  },
  {
    name: 'Happy Vibes',
    description: 'Feel-good music to brighten your day',
    image_url: '/album-images/happy.png',
    bg_color: '#744210',
    tags: ['music', 'happy', 'upbeat']
  }
]

// Sample songs data
const songsData = [
  // Top 50 India Album
  {
    name: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    album_id: 1,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/india.png',
    description: 'A romantic ballad that touches the heart',
    duration: '4:22',
    track_number: 1,
    tags: ['bollywood', 'romantic', 'ballad']
  },
  {
    name: 'Kesariya',
    artist: 'Arijit Singh',
    album_id: 1,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/india.png',
    description: 'A soulful melody from Brahmastra',
    duration: '4:28',
    track_number: 2,
    tags: ['bollywood', 'soulful', 'melody']
  },
  {
    name: 'Raataan Lambiyan',
    artist: 'Jubin Nautiyal',
    album_id: 1,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/india.png',
    description: 'A beautiful love song from Shershaah',
    duration: '3:50',
    track_number: 3,
    tags: ['bollywood', 'love', 'romantic']
  },
  {
    name: 'Maan Meri Jaan',
    artist: 'King',
    album_id: 1,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/india.png',
    description: 'A modern romantic track',
    duration: '3:14',
    track_number: 4,
    tags: ['bollywood', 'modern', 'romantic']
  },
  {
    name: 'What Jhumka?',
    artist: 'Pritam, Arijit Singh',
    album_id: 1,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/india.png',
    description: 'A peppy dance number',
    duration: '4:02',
    track_number: 5,
    tags: ['bollywood', 'dance', 'peppy']
  },

  // Trending World Album
  {
    name: 'Flowers',
    artist: 'Miley Cyrus',
    album_id: 2,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-world.png',
    description: 'A powerful anthem about self-love',
    duration: '3:20',
    track_number: 1,
    tags: ['pop', 'empowering', 'anthem']
  },
  {
    name: 'Vampire',
    artist: 'Olivia Rodrigo',
    album_id: 2,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-world.png',
    description: 'A haunting ballad about toxic relationships',
    duration: '3:39',
    track_number: 2,
    tags: ['pop', 'ballad', 'emotional']
  },
  {
    name: 'Cruel Summer',
    artist: 'Taylor Swift',
    album_id: 2,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-world.png',
    description: 'A summer anthem that never gets old',
    duration: '2:58',
    track_number: 3,
    tags: ['pop', 'summer', 'anthem']
  },
  {
    name: 'Last Night',
    artist: 'Morgan Wallen',
    album_id: 2,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-world.png',
    description: 'A country hit about love and loss',
    duration: '2:44',
    track_number: 4,
    tags: ['country', 'love', 'emotional']
  },
  {
    name: 'Kill Bill',
    artist: 'SZA',
    album_id: 2,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-world.png',
    description: 'A revenge anthem with killer beats',
    duration: '2:33',
    track_number: 5,
    tags: ['r&b', 'revenge', 'empowering']
  },

  // Mega Hits Album
  {
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    album_id: 3,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/mega-hits.png',
    description: 'A rock opera masterpiece',
    duration: '5:55',
    track_number: 1,
    tags: ['rock', 'classic', 'opera']
  },
  {
    name: 'Hotel California',
    artist: 'Eagles',
    album_id: 3,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/mega-hits.png',
    description: 'An iconic rock ballad',
    duration: '6:30',
    track_number: 2,
    tags: ['rock', 'classic', 'ballad']
  },
  {
    name: 'Imagine',
    artist: 'John Lennon',
    album_id: 3,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/mega-hits.png',
    description: 'A timeless peace anthem',
    duration: '3:03',
    track_number: 3,
    tags: ['rock', 'peace', 'timeless']
  },
  {
    name: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album_id: 3,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/mega-hits.png',
    description: 'A legendary rock epic',
    duration: '8:02',
    track_number: 4,
    tags: ['rock', 'epic', 'legendary']
  },
  {
    name: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    album_id: 3,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/mega-hits.png',
    description: 'A rock classic with iconic guitar',
    duration: '5:56',
    track_number: 5,
    tags: ['rock', 'classic', 'guitar']
  },

  // Classic Collection Album
  {
    name: 'Yesterday',
    artist: 'The Beatles',
    album_id: 4,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/album.bild.png',
    description: 'A timeless Beatles classic',
    duration: '2:05',
    track_number: 1,
    tags: ['rock', 'beatles', 'timeless']
  },
  {
    name: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album_id: 4,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/album.bild.png',
    description: 'A revolutionary folk rock song',
    duration: '6:13',
    track_number: 2,
    tags: ['folk', 'rock', 'revolutionary']
  },
  {
    name: 'Respect',
    artist: 'Aretha Franklin',
    album_id: 4,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/album.bild.png',
    description: 'An empowering soul anthem',
    duration: '2:27',
    track_number: 3,
    tags: ['soul', 'empowering', 'anthem']
  },
  {
    name: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album_id: 4,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/album.bild.png',
    description: 'The grunge anthem of a generation',
    duration: '5:01',
    track_number: 4,
    tags: ['grunge', 'rock', 'anthem']
  },
  {
    name: 'Billie Jean',
    artist: 'Michael Jackson',
    album_id: 4,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/album.bild.png',
    description: 'A pop masterpiece with iconic bassline',
    duration: '4:54',
    track_number: 5,
    tags: ['pop', 'dance', 'iconic']
  },

  // Trending India Album
  {
    name: 'Natu Natu',
    artist: 'MM Keeravani',
    album_id: 5,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-india.png',
    description: 'Oscar-winning song from RRR',
    duration: '3:32',
    track_number: 1,
    tags: ['bollywood', 'oscar', 'dance']
  },
  {
    name: 'Pathaan Title Track',
    artist: 'Vishal-Shekhar',
    album_id: 5,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-india.png',
    description: 'High-energy action movie song',
    duration: '3:18',
    track_number: 2,
    tags: ['bollywood', 'action', 'energy']
  },
  {
    name: 'O Bedardeya',
    artist: 'Pritam, Arijit Singh',
    album_id: 5,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-india.png',
    description: 'A soulful romantic track',
    duration: '4:47',
    track_number: 3,
    tags: ['bollywood', 'romantic', 'soulful']
  },
  {
    name: 'Heeriye',
    artist: 'Jasleen Royal',
    album_id: 5,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-india.png',
    description: 'A modern love song',
    duration: '3:15',
    track_number: 4,
    tags: ['bollywood', 'modern', 'love']
  },
  {
    name: 'Chaleya',
    artist: 'Arijit Singh, Shilpa Rao',
    album_id: 5,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/trending-india.png',
    description: 'A beautiful romantic melody',
    duration: '3:21',
    track_number: 5,
    tags: ['bollywood', 'romantic', 'melody']
  },

  // Happy Vibes Album
  {
    name: 'Happy',
    artist: 'Pharrell Williams',
    album_id: 6,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/happy.png',
    description: 'The ultimate feel-good anthem',
    duration: '3:53',
    track_number: 1,
    tags: ['pop', 'happy', 'feel-good']
  },
  {
    name: 'Good Life',
    artist: 'OneRepublic',
    album_id: 6,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/happy.png',
    description: 'A celebration of life and joy',
    duration: '4:13',
    track_number: 2,
    tags: ['pop', 'celebration', 'joy']
  },
  {
    name: 'Walking on Sunshine',
    artist: 'Katrina & The Waves',
    album_id: 6,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/happy.png',
    description: 'A classic upbeat song',
    duration: '3:58',
    track_number: 3,
    tags: ['pop', 'upbeat', 'classic']
  },
  {
    name: 'I Gotta Feeling',
    artist: 'The Black Eyed Peas',
    album_id: 6,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/happy.png',
    description: 'A party anthem for good times',
    duration: '4:49',
    track_number: 4,
    tags: ['pop', 'party', 'anthem']
  },
  {
    name: 'Shake It Off',
    artist: 'Taylor Swift',
    album_id: 6,
    file_url: '/songs/sample.mp3',
    image_url: '/album-images/happy.png',
    description: 'A carefree pop anthem',
    duration: '3:39',
    track_number: 5,
    tags: ['pop', 'carefree', 'anthem']
  }
]

// Function to seed the database
export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Clear existing data (optional - uncomment if you want to start fresh)
    // await supabase.from('playlist_songs').delete()
    // await supabase.from('playlists').delete()
    // await supabase.from('songs').delete()
    // await supabase.from('albums').delete()

    // Insert albums
    console.log('📀 Inserting albums...')
    const { data: albums, error: albumsError } = await supabase
      .from('albums')
      .insert(albumsData)
      .select()

    if (albumsError) {
      console.error('Error inserting albums:', albumsError)
      return false
    }

    console.log(`✅ Inserted ${albums.length} albums`)

    // Insert songs
    console.log('🎵 Inserting songs...')
    const { data: songs, error: songsError } = await supabase
      .from('songs')
      .insert(songsData)
      .select()

    if (songsError) {
      console.error('Error inserting songs:', songsError)
      return false
    }

    console.log(`✅ Inserted ${songs.length} songs`)

    console.log('🎉 Database seeding completed successfully!')
    return true

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    return false
  }
}

// Function to check if database is already seeded
export const isDatabaseSeeded = async () => {
  try {
    const { data: albums, error } = await supabase
      .from('albums')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Error checking database:', error)
      return false
    }

    return albums && albums.length > 0
  } catch (error) {
    console.error('Error checking database:', error)
    return false
  }
}

// Function to get seed data for development
export const getSeedData = () => {
  return {
    albums: albumsData,
    songs: songsData
  }
} 