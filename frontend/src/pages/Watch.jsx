
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from 'lucide-react';
import { MOCK_VIDEOS } from '../../constants';

const Watch = () => {
  const { id } = useParams();
  const currentVideo = MOCK_VIDEOS.find(v => v.id === id) || MOCK_VIDEOS[0];
  const recommendations = MOCK_VIDEOS.filter(v => v.id !== id).slice(0, 10);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 lg:ml-0 lg:max-w-[1700px] mx-auto">
      {/* Primary Content */}
      <div className="flex-grow lg:w-[70%]">
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden mb-4">
          <img src={currentVideo.thumbnail} alt="video" className="w-full h-full object-cover opacity-80" />
        </div>
        
        <h1 className="text-white text-xl font-bold mb-3">{currentVideo.title}</h1>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Link to={`/channel/${currentVideo.id}`}>
              <img src={currentVideo.channelAvatar} alt="channel" className="w-10 h-10 rounded-full" />
            </Link>
            <div className="flex flex-col">
              <Link to={`/channel/${currentVideo.id}`} className="text-white font-bold leading-tight hover:text-white">
                {currentVideo.channelName}
              </Link>
              <span className="text-[#aaaaaa] text-[12px]">1.24M subscribers</span>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-full font-medium ml-4 text-sm hover:bg-[#d9d9d9] transition-colors">
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#272727] rounded-full h-9">
              <button className="flex items-center gap-2 px-3 border-r border-[#444444] hover:bg-[#3f3f3f] rounded-l-full h-full">
                <ThumbsUp size={18} />
                <span className="text-sm font-medium">124K</span>
              </button>
              <button className="px-3 hover:bg-[#3f3f3f] rounded-r-full h-full">
                <ThumbsDown size={18} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-3 bg-[#272727] rounded-full h-9 hover:bg-[#3f3f3f]">
              <Share2 size={18} />
              <span className="text-sm font-medium">Share</span>
            </button>
            <button className="flex items-center gap-2 px-3 bg-[#272727] rounded-full h-9 hover:bg-[#3f3f3f]">
              <Download size={18} />
              <span className="text-sm font-medium">Download</span>
            </button>
            <button className="p-2 bg-[#272727] rounded-full hover:bg-[#3f3f3f]">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="bg-[#272727] rounded-xl p-3 text-sm">
          <div className="flex gap-2 font-bold mb-1">
            <span>{currentVideo.views}</span>
            <span>{currentVideo.postedAt}</span>
          </div>
          <p className="text-white line-clamp-3">
            In this video we explore the concepts behind modern web UI design using React and Tailwind CSS.
            Check out our other tutorials for more in-depth knowledge about frontend engineering.
          </p>
          <button className="font-bold mt-1">...more</button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="lg:w-[30%] flex flex-col gap-3">
        {recommendations.map((video) => (
          <Link key={video.id} to={`/watch/${video.id}`} className="flex gap-2 group">
            <div className="relative w-40 h-24 flex-shrink-0 bg-neutral-800 rounded-lg overflow-hidden">
              <img src={video.thumbnail} alt="thumb" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded">{video.duration}</div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <h3 className="text-white text-sm font-medium line-clamp-2 leading-tight mb-1">{video.title}</h3>
              <span className="text-[#aaaaaa] text-[12px]">{video.channelName}</span>
              <span className="text-[#aaaaaa] text-[12px]">{video.views} • {video.postedAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Watch;
