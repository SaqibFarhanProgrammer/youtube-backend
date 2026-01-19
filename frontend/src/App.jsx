
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Placeholder from './pages/Placeholder';

const App= () => {
  const location = useLocation();
  const isWatchPage = location.pathname.startsWith('/watch');

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header />
      <div className="flex pt-14">
        {!isWatchPage && <Sidebar />}
        <main className={`flex-1 transition-all duration-300 ${isWatchPage ? 'ml-0' : 'lg:ml-60'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/shorts" element={<Placeholder />} />
            <Route path="/subscriptions" element={<Placeholder />} />
            <Route path="/library" element={<Placeholder />} />
            <Route path="/history" element={<Placeholder />} />
            <Route path="/your-videos" element={<Placeholder />} />
            <Route path="/channel/:id" element={<Placeholder />} />
            <Route path="/playlist/:id" element={<Placeholder />} />
            <Route path="/trending" element={<Placeholder />} />
            <Route path="/shopping" element={<Placeholder />} />
            <Route path="/music" element={<Placeholder />} />
            <Route path="/movies" element={<Placeholder />} />
            <Route path="/live" element={<Placeholder />} />
            <Route path="/gaming" element={<Placeholder />} />
            <Route path="/news" element={<Placeholder />} />
            <Route path="/sports" element={<Placeholder />} />
            <Route path="/learning" element={<Placeholder />} />
            <Route path="/upload" element={<Placeholder />} />
            <Route path="/login" element={<Placeholder />} />
            <Route path="/signup" element={<Placeholder />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
