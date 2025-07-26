import React from 'react'
import { assets } from '../assets/assets'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { useFilter } from '../context/FilterContext'

const Navbar = () => {
  const { activeFilter, setActiveFilter } = useFilter();

  const handleFilterChange = (value) => {
    if (value) {
      setActiveFilter(value);
    }
  };

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-7'>
        <img className='w-9' src={assets.arrow} alt="" />
        <img className='w-9' src={assets.arrow} alt="" />
      </div>
      <div className='flex items-center gap-4'>
        <img className='w-10' src={assets.spotify_logo} alt="" />
        <p className='text-white'>Spotify</p>
      </div>
      <div className='flex items-center gap-4'>
        <img className='w-5' src={assets.bell} alt="" />
      </div>
      <div className='flex items-center gap-3 mt-4'>
        <ToggleGroup 
          type="single" 
          value={activeFilter} 
          onValueChange={handleFilterChange}
          className="bg-transparent"
        >
          <ToggleGroupItem 
            value="all" 
            className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer data-[state=on]:bg-white data-[state=on]:text-black data-[state=off]:bg-black data-[state=off]:text-white hover:bg-white hover:text-black transition-colors"
          >
            All
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="music" 
            className="bg-black px-4 py-1 rounded-2xl cursor-pointer data-[state=on]:bg-white data-[state=on]:text-black data-[state=off]:bg-black data-[state=off]:text-white hover:bg-white hover:text-black transition-colors"
          >
            Music
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="podcasts" 
            className="bg-black px-4 py-1 rounded-2xl cursor-pointer data-[state=on]:bg-white data-[state=on]:text-black data-[state=off]:bg-black data-[state=off]:text-white hover:bg-white hover:text-black transition-colors"
          >
            Podcasts
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

export default Navbar
