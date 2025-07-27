// Import images using standard imports for better Vite compatibility
import bell_icon from './bell.png'
import home_icon from './home.png'
import like_icon from './like.png'
import loop_icon from './loop.png'
import mic_icon from './mic.png'
import next_icon from './next.png'
import play_icon from './play.png'
import pause_icon from './pause.png'
import plays_icon from './plays.png'
import prev_icon from './prev.png'
import search_icon from './search.png'
import shuffle_icon from './shuffle.png'
import speaker_icon from './speaker.png'
import stack_icon from './stack.png'
import zoom_icon from './zoom.png'
import plus_icon from './plus.png'
import arrow_icon from './arrow.png'
import mini_player_icon from './mini-player.png'
import queue_icon from './queue.png'
import volume_icon from './volume.png'
import arrow_right from './right_arrow.png'
import arrow_left from './left_arrow.png'
import thmusic_logo from './thmusic.webp'
import clock_icon from './clock_icon.png'

// Remove image and song imports as we'll use string URLs
// Keep icon imports

const STORAGE_BASE_URL = 'https://bcsrmcscwghqfsldbgpy.supabase.co/storage/v1/object/public/ahmusic';

export const assets = {
    bell_icon,
    home_icon,
    like_icon,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    volume_icon,
    queue_icon,
    pause_icon,
    arrow_left,
    arrow_right,
    thmusic_logo,
    clock_icon
}

export const albumsData = [
    {   
        id:0,
        name: "Top 50 Global",
        image: `${STORAGE_BASE_URL}/public/album-images/img8.jpg`, // Adjust path if needed
        desc:"Your weekly update of the most played tracks",
        bgColor:"#2a4365",
        tags: ["music"]
    },
    {   
        id:1,
        name: "Top 50 India",
        image: `${STORAGE_BASE_URL}/public/album-images/img9.jpg`,
        desc:"Your weekly update of the most played tracks",
        bgColor:"#22543d",
        tags: ["music"]
    },
    {   
        id:2,
        name: "Trending India",
        image: `${STORAGE_BASE_URL}/public/album-images/img10.jpg`,
        desc:"Your weekly update of the most played tracks",
        bgColor:"#742a2a",
        tags: ["music"]
    },
    {   
        id:3,
        name: "Trending Global",
        image: `${STORAGE_BASE_URL}/public/album-images/img16.jpg`,
        desc:"Your weekly update of the most played tracks",
        bgColor:"#44337a",
        tags: ["music"]
    },
    {   
        id:4,
        name: "Mega Hits,",
        image: `${STORAGE_BASE_URL}/public/album-images/img11.jpg`,
        desc:"Your weekly update of the most played tracks",
        bgColor:"#234e52",
        tags: ["music"]
    },
    {   
        id:5,
        name: "Happy Favorites",
        image: `${STORAGE_BASE_URL}/public/album-images/img15.jpg`,
        desc:"Your weekly update of the most played tracks",
        bgColor:"#744210",
        tags: ["music"]
    },
    {   
        id:6,
        name: "Tech Talk Daily",
        image: `${STORAGE_BASE_URL}/public/album-images/img13.jpg`,
        desc:"Latest technology discussions and insights",
        bgColor:"#1a365d",
        tags: ["podcasts"]
    },
    {   
        id:7,
        name: "Comedy Hour",
        image: `${STORAGE_BASE_URL}/public/album-images/img6.jpg`,
        desc:"Laugh out loud with the best comedians",
        bgColor:"#553c9a",
        tags: ["podcasts"]
    }
]
