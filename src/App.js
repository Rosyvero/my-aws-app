import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const UNSPLASH_ACCESS_KEY = 'MkovGsPFoYxHbKRBOBto1aEEcT4nPktJRq2ecfDrhbc';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

function App() {
  const [pins, setPins] = useState([]);
  const [displayPins, setDisplayPins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [isShowingAPIResults, setIsShowingAPIResults] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [filterTagActive, setFilterTagActive] = useState('');
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Initial pin data from your original script.js
  const initialPins = [
    { id: 1, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop', alt: 'Pink tulips in spring garden', tags: ['pink', 'flowers', 'pictures', 'summer', 'aesthetic'] },
    { id: 2, image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop', alt: 'Golden hour sunlight through forest', tags: ['summer', 'pictures', 'aesthetic', 'nature'] },
    { id: 3, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop', alt: 'Cozy cafe interior aesthetic', tags: ['aesthetic', 'pictures', 'quotes'] },
    { id: 4, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop', alt: 'Mountain landscape at sunrise', tags: ['blue', 'pictures', 'summer', 'aesthetic'] },
    { id: 5, image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&auto=format&fit=crop', alt: 'Coffee and pastry flatlay', tags: ['aesthetic', 'pictures', 'quotes'] },
    { id: 6, image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400&auto=format&fit=crop', alt: 'Lavender field at sunset', tags: ['purple', 'summer', 'pictures', 'aesthetic', 'flowers'] },
    { id: 7, image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&auto=format&fit=crop', alt: 'Basketball court aesthetic', tags: ['pictures', 'aesthetic', 'blue', 'sports'] },
    { id: 8, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop', alt: 'Cozy living room interior', tags: ['aesthetic', 'pictures', 'room'] },
    { id: 9, image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&auto=format&fit=crop', alt: 'Healthy breakfast bowl', tags: ['pictures', 'aesthetic', 'pink', 'food'] },
    { id: 10, image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=400&auto=format&fit=crop', alt: 'Colorful balloons celebration', tags: ['pink', 'pictures', 'aesthetic', 'summer'] },
    { id: 11, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop', alt: 'Portrait photography pfp', tags: ['pfp', 'pictures', 'aesthetic'] },
    { id: 12, image: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=400&auto=format&fit=crop', alt: 'Forest path in autumn', tags: ['pictures', 'aesthetic', 'summer', 'nature'] },
    { id: 13, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop', alt: 'Gym workout fitness aesthetic', tags: ['gym', 'outfits', 'aesthetic'] },
    { id: 14, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop', alt: 'Fitness girl gym workout', tags: ['gym', 'outfits', 'aesthetic', 'pfp'] },
    { id: 15, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop', alt: 'Pink aesthetic room decor', tags: ['pink', 'aesthetic', 'room', 'pictures'] },
    { id: 16, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&auto=format&fit=crop', alt: 'Fashion outfit street style', tags: ['outfits', 'aesthetic', 'pfp', 'pictures'] },
    { id: 17, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop', alt: 'Fashion model outfit aesthetic', tags: ['outfits', 'aesthetic', 'pfp'] },
    { id: 18, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop', alt: 'Beautiful portrait pfp girl', tags: ['pfp', 'aesthetic', 'pictures'] },
    { id: 19, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop', alt: 'Portrait aesthetic profile picture', tags: ['pfp', 'aesthetic', 'pictures'] },
    { id: 20, image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop', alt: 'Motivational quotes aesthetic', tags: ['quotes', 'aesthetic', 'pictures'] },
    { id: 21, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop', alt: 'Beach summer vibes ocean', tags: ['summer', 'blue', 'pictures', 'aesthetic'] },
    { id: 22, image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&auto=format&fit=crop', alt: 'Purple aesthetic sunset', tags: ['purple', 'aesthetic', 'pictures', 'summer'] },
    { id: 23, image: 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=400&auto=format&fit=crop', alt: 'Purple flowers lavender field', tags: ['purple', 'flowers', 'pictures', 'aesthetic'] }
  ];

  // Suggested searches for overlay
  const suggestedSearches = [
    { text: 'aesthetic', image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=100&h=100&fit=crop' },
    { text: 'minimalism', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=100&h=100&fit=crop' },
    { text: 'nature photography', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
    { text: 'interior design', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=100&h=100&fit=crop' },
    { text: 'street photography', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=100&h=100&fit=crop' },
    { text: 'architecture', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=100&h=100&fit=crop' }
  ];

  // Initialize pins on mount
  useEffect(() => {
    const topics = ['aesthetic', 'minimalism', 'nature', 'interior design', 'street photography', 'architecture', 'art', 'cinematic'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    if (UNSPLASH_ACCESS_KEY && UNSPLASH_ACCESS_KEY !== 'YOUR_UNSPLASH_ACCESS_KEY_HERE') {
      searchUnsplashImages(randomTopic);
    } else {
      setPins(initialPins);
      setDisplayPins(initialPins);
    }
  }, []);

  // Search Unsplash API
  const searchUnsplashImages = async (query) => {
    try {
      const response = await fetch(`${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=30&client_id=${UNSPLASH_ACCESS_KEY}`);
      const data = await response.json();
      
      const unsplashPins = data.results.map((photo) => ({
        id: `unsplash-${photo.id}`,
        image: photo.urls.regular,
        alt: photo.alt_description || photo.description || 'Unsplash image',
        tags: ['aesthetic', 'pictures']
      }));
      
      setPins(unsplashPins);
      setDisplayPins(unsplashPins);
      setIsShowingAPIResults(true);
    } catch (error) {
      console.error('Error fetching from Unsplash:', error);
      setPins(initialPins);
      setDisplayPins(initialPins);
    }
  };

  // Handle search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchUnsplashImages(searchTerm);
      setSearchOverlayOpen(false);
      setActiveFilter('');
      setFilterTagActive('');
    }
  };

  // Handle filter selection
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setFilterTagActive(filter);
    setDropdownOpen(false);
    
    if (!filter || isShowingAPIResults) {
      setDisplayPins(pins);
    } else {
      const filtered = pins.filter(pin => 
        pin.tags && pin.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      );
      setDisplayPins(filtered);
    }
  };

  // Handle tag click
  const handleTagClick = (tag) => {
    const tagLower = tag.toLowerCase();
    setActiveFilter(tagLower);
    setFilterTagActive(tagLower);
    
    if (isShowingAPIResults) {
      searchUnsplashImages(tag);
    } else {
      const filtered = pins.filter(pin => 
        pin.tags && pin.tags.some(t => t.toLowerCase().includes(tagLower))
      );
      setDisplayPins(filtered);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle navigation clicks
  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    if (navItem === 'home') {
      window.location.reload();
    }
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <a href="#" className="sidebar-icon pinterest-logo" title="Pinterest">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
          </a>
          <a 
            href="#" 
            className={`sidebar-icon ${activeNav === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
            title="Home"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1.5l-8.5 7.7V22h6v-5.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5V22h6V9.2L12 1.5z" />
            </svg>
          </a>
          <a 
            href="#" 
            className={`sidebar-icon ${activeNav === 'explore' ? 'active' : ''}`}
            onClick={() => handleNavClick('explore')}
            title="Explore"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm2.85 14.85l-6.1 2.35a1.51 1.51 0 01-1.93-1.93l2.37-6.1a1.51 1.51 0 01.86-.86l6.1-2.35a1.51 1.51 0 011.93 1.93l-2.35 6.1a1.51 1.51 0 01-.88.86zm-1.76-4.78a1.51 1.51 0 10-2.16 2.11 1.51 1.51 0 002.16-2.11z" />
            </svg>
          </a>
          <a 
            href="#" 
            className={`sidebar-icon ${activeNav === 'create' ? 'active' : ''}`}
            onClick={() => handleNavClick('create')}
            title="Create"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 10h-8V2a2 2 0 00-4 0v8H2a2 2 0 000 4h8v8a2 2 0 004 0v-8h8a2 2 0 000-4z" />
            </svg>
          </a>
          <a 
            href="#" 
            className={`sidebar-icon ${activeNav === 'messages' ? 'active' : ''}`}
            onClick={() => handleNavClick('messages')}
            title="Messages"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 12.5a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5zm-6 0a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5zm-6 0A1.5 1.5 0 114.5 11a1.5 1.5 0 011.5 1.5zm-6 5a9.5 9.5 0 019.5-9.5h5A9.5 9.5 0 0124 17.5v4a.5.5 0 01-.5.5h-19a.5.5 0 01-.5-.5v-4z" />
            </svg>
          </a>
          <a 
            href="#" 
            className={`sidebar-icon ${activeNav === 'notifications' ? 'active' : ''}`}
            onClick={() => handleNavClick('notifications')}
            title="Notifications"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 24c-1.66 0-3-1.34-3-3h6c0 1.66-1.34 3-3 3zm7-10.83V8c0-3.86-3.14-7-7-7S5 4.14 5 8v5.17L3.59 14.59A2 2 0 005 18h14a2 2 0 001.41-3.41L19 13.17z" />
            </svg>
          </a>
          <a 
            href="#" 
            className={`sidebar-icon ${activeNav === 'updates' ? 'active' : ''}`}
            onClick={() => handleNavClick('updates')}
            title="Updates"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm-.5-14v5.3l4.5 2.7.8-1.2-3.8-2.3V7H11.5z" />
            </svg>
          </a>
        </div>
        <div className="sidebar-bottom">
          <a 
            href="#" 
            className={`sidebar-icon ${activeNav === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavClick('settings')}
            title="Settings"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm0-6.5a1.5 1.5 0 011.5 1.5v.74a7.02 7.02 0 012.56 1.48l.64-.37a1.5 1.5 0 012.06.55l.5.87a1.5 1.5 0 01-.55 2.05l-.64.37a7.07 7.07 0 010 2.96l.64.37a1.5 1.5 0 01.55 2.05l-.5.87a1.5 1.5 0 01-2.06.55l-.64-.37a7.02 7.02 0 01-2.56 1.48v.74a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-.74a7.02 7.02 0 01-2.56-1.48l-.64.37a1.5 1.5 0 01-2.06-.55l-.5-.87a1.5 1.5 0 01.55-2.05l.64-.37a7.07 7.07 0 010-2.96l-.64-.37a1.5 1.5 0 01-.55-2.05l.5-.87a1.5 1.5 0 012.06-.55l.64.37a7.02 7.02 0 012.56-1.48V4a1.5 1.5 0 011.5-1.5h1z" />
            </svg>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchOverlayOpen(true)}
                autoComplete="off"
              />
            </form>
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => {
                  setSearchTerm('');
                  searchInputRef.current?.focus();
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
            
            {/* Search Overlay */}
            {searchOverlayOpen && (
              <div className="search-overlay active">
                <div className="search-overlay-inner">
                  <h2 className="recent-searches-title">Recent searches</h2>
                  <div className="recent-searches-grid">
                    {suggestedSearches.map((search, index) => (
                      <div
                        key={index}
                        className="recent-search-item"
                        onClick={() => {
                          setSearchTerm(search.text);
                          searchUnsplashImages(search.text);
                          setSearchOverlayOpen(false);
                        }}
                      >
                        <img src={search.image} alt={search.text} className="recent-search-image" />
                        <span className="recent-search-text">{search.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="header-right">
            <div className={`dropdown-wrapper ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
              <button
                className="dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span id="dropdownLabel">{activeFilter ? activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) : 'All Pins'}</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="dropdown-arrow">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </button>
              
              <div className="dropdown-menu">
                <button className={`dropdown-item ${!activeFilter ? 'active' : ''}`} onClick={() => handleFilterClick('')}>All Pins</button>
                <button className={`dropdown-item ${activeFilter === 'pink' ? 'active' : ''}`} onClick={() => handleFilterClick('pink')}>Pink</button>
                <button className={`dropdown-item ${activeFilter === 'blue' ? 'active' : ''}`} onClick={() => handleFilterClick('blue')}>Blue</button>
                <button className={`dropdown-item ${activeFilter === 'purple' ? 'active' : ''}`} onClick={() => handleFilterClick('purple')}>Purple</button>
                <button className={`dropdown-item ${activeFilter === 'summer' ? 'active' : ''}`} onClick={() => handleFilterClick('summer')}>Summer</button>
                <button className={`dropdown-item ${activeFilter === 'gym' ? 'active' : ''}`} onClick={() => handleFilterClick('gym')}>Gym</button>
                <button className={`dropdown-item ${activeFilter === 'outfits' ? 'active' : ''}`} onClick={() => handleFilterClick('outfits')}>Outfits</button>
                <button className={`dropdown-item ${activeFilter === 'pfp' ? 'active' : ''}`} onClick={() => handleFilterClick('pfp')}>Profile Pictures</button>
                <button className={`dropdown-item ${activeFilter === 'quotes' ? 'active' : ''}`} onClick={() => handleFilterClick('quotes')}>Quotes</button>
              </div>
            </div>
            
            <div className="user-avatar">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User Profile" />
            </div>
            
            <button className="more-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Filter Tags */}
        <div className="filter-tags">
          <button className="filter-btn settings-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
            </svg>
          </button>
          <div className="tags-scroll">
            <button className={`filter-tag ${filterTagActive === 'pink' ? 'active' : ''}`} onClick={() => handleTagClick('Pink')}>
              <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=50&h=50&fit=crop" alt="Pink" />
              <span>Pink</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'pfp' ? 'active' : ''}`} onClick={() => handleTagClick('Pfp')}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" alt="Pfp" />
              <span>Pfp</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'blue' ? 'active' : ''}`} onClick={() => handleTagClick('Blue')}>
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=50&h=50&fit=crop" alt="Blue" />
              <span>Blue</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'summer' ? 'active' : ''}`} onClick={() => handleTagClick('Summer')}>
              <img src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=50&h=50&fit=crop" alt="Summer" />
              <span>Summer</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'pictures' ? 'active' : ''}`} onClick={() => handleTagClick('Pictures')}>
              <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=50&h=50&fit=crop" alt="Pictures" />
              <span>Pictures</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'quotes' ? 'active' : ''}`} onClick={() => handleTagClick('Quotes')}>
              <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=50&h=50&fit=crop" alt="Quotes" />
              <span>Quotes</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'outfits' ? 'active' : ''}`} onClick={() => handleTagClick('Outfits')}>
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=50&h=50&fit=crop" alt="Outfits" />
              <span>Outfits</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'gym' ? 'active' : ''}`} onClick={() => handleTagClick('Gym')}>
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=50&h=50&fit=crop" alt="Gym" />
              <span>Gym</span>
            </button>
            <button className={`filter-tag ${filterTagActive === 'purple' ? 'active' : ''}`} onClick={() => handleTagClick('Purple')}>
              <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=50&h=50&fit=crop" alt="Purple" />
              <span>Purple</span>
            </button>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {displayPins.map((pin) => (
            <div key={pin.id} className="pin-card">
              <img src={pin.image} alt={pin.alt} className="pin-image" loading="lazy" />
              <div className="pin-overlay">
                <div className="pin-actions-top">
                  <button className="save-btn">Save</button>
                </div>
                <div className="pin-actions-bottom">
                  <div className="pin-source"></div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="pin-icon-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                    </button>
                    <button className="pin-icon-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
