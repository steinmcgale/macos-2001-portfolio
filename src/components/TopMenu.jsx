// components/TopMenu
import React, { useEffect, useState } from 'react';
import './TopMenu.css';
import appleLogo from '../Images/apple-logo.png';

const TopMenu = ({ onOpenWindow }) => {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);

  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Updated time format 
  const formattedTime = time.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  
  const handleMenuClick = (menuName) => {
    // If clicking the same menu, close it. Otherwise, open the new one
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  // Handle dropdown item clicks 
  const handleDropdownClick = (windowType, windowTitle) => {
    // Close the dropdown menu
    setActiveMenu(null);
    // Tell parent component to open a window (I will connect this later)
    if (onOpenWindow) {
      onOpenWindow(windowType, windowTitle);
    }
  };

  // Close dropdown when clicking elsewhere 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-item')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  
  const menuItems = {
    file: [
      { label: 'About Me', action: () => handleDropdownClick('about me', 'About Me') },
      { label: 'My Resume', action: () => handleDropdownClick('resume', 'Resume') },
      
    ],
    edit: [
      { label: 'Change Background', action: () => handleDropdownClick('background', 'Desktop Settings') },
      { label: 'Theme Settings', action: () => handleDropdownClick('theme', 'Theme Settings') },
    ],
    view: [
      { label: 'Portfolio', action: () => handleDropdownClick('Portfolio', 'Portfolio') },
      
      { label: 'GitHub', action: () => handleDropdownClick('github', 'GitHub') },
     
    ],
    window: [
      { label: 'QuickTime Player', action: () => handleDropdownClick('quicktime', 'QuickTime Player') },
      { label: 'iTunes', action: () => handleDropdownClick('itunes', 'iTunes') },
      { label: 'TextEdit', action: () => handleDropdownClick('textedit', 'TextEdit') },
    ],
    contact: [
      { label: 'Send Email', action: () => handleDropdownClick('email', 'Send Email') },
      { label: 'LinkedIn Profile', action: () => window.open('https://www.linkedin.com/in/stein-mcgale/', '_blank') },
      
    ]
  };

  return (
    <div className="osx-menu-bar">
      <div className="menu-left">
        <div className="apple-menu"
        onClick={() => handleDropdownClick('aboutThisMac', 'About This Mac')}>
          <img src={appleLogo} alt="Apple" className="apple-logo" />
        </div>
        
        <div className="app-name">Finder</div>
        
        {/*Dynamic Menu Rendering */}
        {Object.entries({
          file: 'File',
          edit: 'Edit', 
          view: 'View',
          window: 'Window',
          contact: 'Contact'
        }).map(([key, label]) => (
          <div key={key} className="menu-container">
            <div 
              className={`menu-item ${activeMenu === key ? 'active' : ''}`}
              onClick={() => handleMenuClick(key)}
            >
              {label}
            </div>
            
            {/* Conditional Rendering */}
            {activeMenu === key && (
              <div className="dropdown-menu">
                {menuItems[key].map((item, index) => (
                  <div 
                    key={index}
                    className="dropdown-item"
                    onClick={item.action}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="menu-right">
        <div className="menu-extras">
          <div className="time-display">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;





