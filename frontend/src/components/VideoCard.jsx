
import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer mb-8">
      <Link to={`/watch/${video.id}`} className="relative aspect-video w-full overflow-hidden rounded-xl">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </Link>
      
      <div className="flex gap-3 px-1">
        <Link to={`/channel/${video.id}`} className="flex-shrink-0">
          <img 
            src={video.channelAvatar} 
            alt={video.channelName} 
            className="w-9 h-9 rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Link to={`/watch/${video.id}`}>
            <h3 className="text-white text-[15px] font-medium leading-tight line-clamp-2 group-hover:text-white">
              {video.title}
            </h3>
          </Link>
          <div className="mt-1 flex flex-col">
            <Link to={`/channel/${video.id}`} className="text-[#aaaaaa] text-sm hover:text-white transition-colors">
              {video.channelName}
            </Link>
            <div className="text-[#aaaaaa] text-sm">
              {video.views} • {video.postedAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
