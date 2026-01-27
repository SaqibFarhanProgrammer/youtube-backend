import React from "react";
import { Link } from "react-router-dom";

const formatDuration = (seconds = 0) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatViews = (views = 0) => {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
};

const formatTimeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  const days = Math.floor(diff / 86400);
  if (days > 0) return `${days} days ago`;
  const hours = Math.floor(diff / 3600);
  if (hours > 0) return `${hours} hours ago`;
  const mins = Math.floor(diff / 60);
  return `${mins} minutes ago`;
};

const VideoCard = ({ video }) => {
  if (!video) return null;

  return (
    <div className="flex flex-col gap-3 group cursor-pointer mb-8">
      <Link
        to={`/watch/${video._id}`}
        className="relative aspect-video w-full overflow-hidden rounded-xl"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
      </Link>

      <div className="flex gap-3 px-1">
        <img
          src="https://i.pravatar.cc/100"
          alt="channel avatar"
          className="w-9 h-9 rounded-full object-cover"
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <h3 className="text-white text-[15px] font-medium leading-tight line-clamp-2">
            {video.title}
          </h3>

          <div className="mt-1 text-[#aaaaaa] text-sm">
            <div className="hover:text-white cursor-pointer">
              Youth Club
            </div>
            <div>
              {formatViews(video.views)} • {formatTimeAgo(video.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VideoCard);
