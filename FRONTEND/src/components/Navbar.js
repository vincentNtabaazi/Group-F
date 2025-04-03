//this is the navigation bar for the website
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { Button } from './Button';
import StudentDashboard from '../AITS_Pages/StudentDashboard';
import AcademicIssuePage from '../AITS_Pages/issuepage';
import NotificationPage from '../utils/notifications';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  window.addEventListener('resize', showButton);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <img src="/images/Aitslogo.png" alt="AITS Logo" className="welcome-page-logo" />

          <Link to='/' className='navbar-logo'>
            AITS<i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/StudentDashboard' className='nav-links' onClick={StudentDashboard}>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/notifications' className='nav-links' onClick={NotificationPage}>
                Notifications
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/AcademicIssuePage' className='nav-links' onClick={AcademicIssuePage}>
                Issues
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' onClick={handleLoginClick}>Login</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;