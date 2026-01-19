
import React from 'react';
import { CATEGORIES } from '../../constants';

const CategoryBar = () => {
  return (
    <div className="sticky top-14 left-0 right-0 bg-[#0f0f0f] z-30 py-3 px-4 flex gap-3 overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            cat.id === 'all' 
              ? 'bg-white text-black' 
              : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
          }`}
        >
          {cat.name}
        </button>
      ))}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryBar;
