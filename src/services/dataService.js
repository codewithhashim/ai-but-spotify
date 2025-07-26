import { supabase, createClerkSupabaseClient } from '../lib/supabase'

// Songs and Albums (public data - no authentication needed)
export const dataService = {
  // Fetch all songs
  async getSongs() {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('id')
    
    if (error) {
      console.error('Error fetching songs:', error)
      return []
    }
    return data || []
  },

  // Fetch all albums
  async getAlbums() {
    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .order('id')
    
    if (error) {
      console.error('Error fetching albums:', error)
      return []
    }
    return data || []
  },

  // Fetch songs by album
  async getSongsByAlbum(albumId) {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('album_id', albumId)
      .order('track_number')
    
    if (error) {
      console.error('Error fetching songs by album:', error)
      return []
    }
    return data || []
  },

  // Search songs
  async searchSongs(query) {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .or(`name.ilike.%${query}%,artist.ilike.%${query}%`)
      .order('name')
    
    if (error) {
      console.error('Error searching songs:', error)
      return []
    }
    return data || []
  },

  // Search albums
  async searchAlbums(query) {
    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name')

    if (error) {
      console.error('Error searching albums:', error)
      return []
    }
    return data || []
  },

  // Get song by ID
  async getSongById(id) {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching song:', error)
      return null
    }
    return data
  },

  // Get album by ID
  async getAlbumById(id) {
    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching album:', error)
      return null
    }
    return data
  }
}

// Playlist operations (require Clerk authentication)
export const playlistService = {
  // Get user playlists
  async getUserPlaylists(userId, getToken) {
    const token = await getToken({ template: 'supabase' })
    const client = createClerkSupabaseClient(token)
    const { data, error } = await client
      .from('playlists')
      .select(`
        *,
        playlist_songs (
          song_id,
          songs (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching user playlists:', error)
      return []
    }
    return data || []
  },

  // Create playlist
  async createPlaylist(userId, playlistData, getToken) {
    const token = await getToken({ template: 'supabase' })
    const client = createClerkSupabaseClient(token)

    // Ensure user profile exists (upsert)
    await client
      .from('user_profiles')
      .upsert({ id: userId })

    const { data, error } = await client
      .from('playlists')
      .insert({
        user_id: userId,
        name: playlistData.name,
        description: playlistData.description,
        image_url: playlistData.image_url,
        is_public: playlistData.is_public || false
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating playlist:', error)
      return null
    }
    return data
  },

  // Update playlist
  async updatePlaylist(playlistId, updates, getToken) {
    const token = await getToken({ template: 'supabase' })
    const client = createClerkSupabaseClient(token)
    const { data, error } = await client
      .from('playlists')
      .update(updates)
      .eq('id', playlistId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating playlist:', error)
      return null
    }
    return data
  },

  // Delete playlist
  async deletePlaylist(playlistId, getToken) {
    const token = await getToken({ template: 'supabase' })
    const client = createClerkSupabaseClient(token)
    const { error } = await client
      .from('playlists')
      .delete()
      .eq('id', playlistId)
    
    if (error) {
      console.error('Error deleting playlist:', error)
      return false
    }
    return true
  },

  // Add song to playlist
  async addSongToPlaylist(playlistId, songId, getToken) {
    const token = await getToken({ template: 'supabase' })
    const client = createClerkSupabaseClient(token)
    const { error } = await client
      .from('playlist_songs')
      .insert({
        playlist_id: playlistId,
        song_id: songId
      })
    
    if (error) {
      console.error('Error adding song to playlist:', error)
      return false
    }
    return true
  },

  // Remove song from playlist
  async removeSongFromPlaylist(playlistId, songId, getToken) {
    const token = await getToken({ template: 'supabase' })
    const client = createClerkSupabaseClient(token)
    const { error } = await client
      .from('playlist_songs')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('song_id', songId)
    
    if (error) {
      console.error('Error removing song from playlist:', error)
      return false
    }
    return true
  },

  // Get playlist with songs
  async getPlaylistWithSongs(playlistId, getToken) {
    const token = await getToken({ template: 'supabase' })
    const client = createClerkSupabaseClient(token)
    const { data, error } = await client
      .from('playlists')
      .select(`
        *,
        playlist_songs (
          song_id,
          songs (*)
        )
      `)
      .eq('id', playlistId)
      .single()
    
    if (error) {
      console.error('Error fetching playlist:', error)
      return null
    }
    return data
  }
}

// Note: User authentication is now handled by Clerk
// The userService functions have been removed as they are no longer needed 