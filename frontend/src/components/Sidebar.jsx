
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  SIDEBAR_PRIMARY, 
  SIDEBAR_SECONDARY, 
  SIDEBAR_EXPLORE 
} from '../../constants';

const SidebarSection = ({ items, title }) => {
  const location = useLocation();

  return (
    <div className="py-3 border-b border-[#303030]">
      {title && <h3 className="px-6 py-2 text-sm font-medium text-white">{title}</h3>}
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={`flex items-center gap-5 px-3 py-2.5 mx-3 rounded-lg transition-colors hover:bg-[#272727] ${
              isActive ? 'bg-[#272727] font-medium' : ''
            }`}
          >
            <div className={`${isActive ? 'text-white' : 'text-white'}`}>{item.icon}</div>
            <span className="text-sm text-white truncate">{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

const Sidebar= () => {
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-60 bg-[#0f0f0f] overflow-y-auto z-40 hidden lg:block">
      <SidebarSection items={SIDEBAR_PRIMARY} />
      <SidebarSection items={SIDEBAR_SECONDARY} title="You" />
      <SidebarSection items={SIDEBAR_EXPLORE} title="Explore" />
      
      <div className="px-6 py-4 flex flex-wrap gap-x-2 gap-y-1 text-[12px] font-medium text-[#aaaaaa]">
        <span>About</span>
        <span>Press</span>
        <span>Copyright</span>
        <span>Contact us</span>
        <span>Creators</span>
        <span>Advertise</span>
        <span>Developers</span>
      </div>

      <div className="px-6 py-4 flex flex-wrap gap-x-2 gap-y-1 text-[12px] font-medium text-[#aaaaaa]">
        <span>Terms</span>
        <span>Privacy</span>
        <span>Policy & Safety</span>
        <span>How YouTube works</span>
        <span>Test new features</span>
      </div>

      <div className="px-6 py-4 text-[12px] text-[#717171]">
        © 2024 Google LLC
      </div>
    </aside>
  );
};

export default Sidebar;
