
import React from 'react';
import { 
  Home, 
  PlaySquare, 
  Tv, 
  Library, 
  History, 
  Clock, 
  ThumbsUp, 
  Flame,  
  ShoppingBag, 
  Music2, 
  Film, 
  Radio, 
  Gamepad2, 
  Newspaper, 
  Trophy, 
  Lightbulb, 
  Settings, 
  Flag, 
  HelpCircle, 
  MessageSquareWarning
} from 'lucide-react';

export const SIDEBAR_PRIMARY = [
  { id: 'home', label: 'Home', icon: <Home size={20} />, path: '/' },
  { id: 'shorts', label: 'Shorts', icon: <PlaySquare size={20} />, path: '/shorts' },
  { id: 'subscriptions', label: 'Subscriptions', icon: <Tv size={20} />, path: '/subscriptions' },
];

export const SIDEBAR_SECONDARY = [
  { id: 'library', label: 'Library', icon: <Library size={20} />, path: '/library' },
  { id: 'history', label: 'History', icon: <History size={20} />, path: '/history' },
  { id: 'your-videos', label: 'Your videos', icon: <PlaySquare size={20} />, path: '/your-videos' },
  { id: 'watch-later', label: 'Watch later', icon: <Clock size={20} />, path: '/playlist/wl' },
  { id: 'liked-videos', label: 'Liked videos', icon: <ThumbsUp size={20} />, path: '/playlist/liked' },
];

export const SIDEBAR_EXPLORE= [
  { id: 'trending', label: 'Trending', icon: <Flame size={20} />, path: '/trending' },
  { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={20} />, path: '/shopping' },
  { id: 'music', label: 'Music', icon: <Music2 size={20} />, path: '/music' },
  { id: 'movies', label: 'Movies & TV', icon: <Film size={20} />, path: '/movies' },
  { id: 'live', label: 'Live', icon: <Radio size={20} />, path: '/live' },
  { id: 'gaming', label: 'Gaming', icon: <Gamepad2 size={20} />, path: '/gaming' },
  { id: 'news', label: 'News', icon: <Newspaper size={20} />, path: '/news' },
  { id: 'sports', label: 'Sports', icon: <Trophy size={20} />, path: '/sports' },
  { id: 'learning', label: 'Learning', icon: <Lightbulb size={20} />, path: '/learning' },
];

export const CATEGORIES= [
  { id: 'all', name: 'All' },
  { id: 'music', name: 'Music' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'live', name: 'Live' },
  { id: 'tech', name: 'Technology' },
  { id: 'mixes', name: 'Mixes' },
  { id: 'news', name: 'News' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'coding', name: 'Coding' },
  { id: 'vlogs', name: 'Vlogs' },
  { id: 'sports', name: 'Sports' },
  { id: 'podcasts', name: 'Podcasts' },
];

export const MOCK_VIDEOS = Array.from({ length: 24 }).map((_, i) => ({
  id: `vid-${i}`,
  title: i % 2 === 0 
    ? "Building a Pixel Perfect YouTube Clone with React and Tailwind CSS - Step by Step Tutorial 2024"
    : "Top 10 Cities You Must Visit in 2025 - Travel Guide for Digital Nomads and Families",
  thumbnail: `https://picsum.photos/seed/${i + 123}/640/360`,
  channelName: i % 3 === 0 ? "Tech Mastery" : i % 3 === 1 ? "Travel Junkie" : "Coding with J",
  channelAvatar: `https://picsum.photos/seed/avatar-${i}/40/40`,
  views: `${Math.floor(Math.random() * 900) + 10}K views`,
  postedAt: `${Math.floor(Math.random() * 11) + 1} months ago`,
  duration: `${Math.floor(Math.random() * 15) + 5}:${Math.floor(Math.random() * 50) + 10}`,
  categoryId: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1].id
}));
