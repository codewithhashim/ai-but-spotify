import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from './ui/card'

const AlbumItem = ({image,name,desc,id}) => {
    const navigate = useNavigate()

  return (
    <Card 
      onClick={() => navigate(`/album/${id}`)} 
      className="group cursor-pointer bg-[#181818] border-[#282828] hover:bg-[#282828] transition-all duration-200 overflow-hidden"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img 
            className="w-full h-full object-cover rounded-full" 
            src={image} 
            alt={name}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-1">
          <p className="font-bold text-white truncate">{name}</p>
          <p className="text-slate-200 text-sm line-clamp-2">{desc}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AlbumItem
