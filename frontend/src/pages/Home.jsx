import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import CategoryBar from "../components/CategoryBar";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);

  const getAllVideos = async () => {  
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/video?page=1&limit=2",
      );
      console.log(res.data.data);
      setVideos(res.data.data);
      
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

useEffect(() => {
  getAllVideos().then((a) => {
    console.log(a);
  });
}, []);


  return (
    <div className="flex flex-col">
      <CategoryBar />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
