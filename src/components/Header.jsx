import React from 'react'
import { Link,useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <header>
        <div className="logo">Art & Photography</div>
      <nav>
        <ul>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link></li>
          <li><Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>Favorites</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
