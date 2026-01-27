import React, { useState } from "react";
import { Menu, Search, Mic, Video, Bell, User, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-50">

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#272727] rounded-full transition-colors">
          <Menu size={24} color="#ffffff" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="bg-[#ff0000] p-1 rounded-lg">
            <LayoutGrid size={20} color="white" fill="white" />
          </div>
          <span className="text-white font-bold tracking-tighter text-xl">
            YouTube
          </span>
        </Link>
      </div>

      <div className="flex items-center flex-1 max-w-[720px] ml-10">
        <div className="flex flex-1 items-center bg-[#121212] border border-[#303030] rounded-l-full px-4 h-10 ml-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-white w-full text-base placeholder-[#888888]"
          />
        </div>
        <button className="bg-[#222222] border border-[#303030] border-l-0 rounded-r-full px-5 h-10 flex items-center justify-center hover:bg-[#272727]">
          <Search size={20} color="#ffffff" strokeWidth={1.5} />
        </button>
        <button className="p-2 ml-4 bg-[#181818] hover:bg-[#272727] rounded-full transition-colors">
          <Mic size={20} color="#ffffff" fill="#ffffff" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-[#272727] rounded-full transition-colors">
          <Video size={24} color="#ffffff" />
        </button>
        <button className="p-2 hover:bg-[#272727] rounded-full transition-colors relative">
          <Bell size={24} color="#ffffff" />
          <span className="absolute top-1 right-1 bg-[#cc0000] text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center">
            9+
          </span>
        </button>
        <div className="ml-2 w-8 h-8 rounded-full overflow-hidden cursor-pointer">
          <img src="https://picsum.photos/seed/my-avatar/40/40" alt="profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
