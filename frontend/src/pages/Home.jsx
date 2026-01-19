import React from "react";
import VideoCard from "../components/VideoCard";
import CategoryBar from "../components/CategoryBar";
import { MOCK_VIDEOS } from "../../constants";

const Home = () => {
  return (
    <div className="flex flex-col">
      <CategoryBar />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
        {MOCK_VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
