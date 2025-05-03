// src/components/Header.js
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import { useState, useContext } from 'react';
import '../stylesheet/Header.css';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="app-header navbar navbar-expand-lg shadow-sm">
      <div className="container">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img 
              src="/aflogo.png" 
              alt="World Explorer Logo" 
              className="d-none d-sm-block"
              style={{ height: '30px', marginRight: '15px' }} 
            />
            <h1 className="m-0 fs-4 fw-bold">World Explorer</h1>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="navbar-toggler d-lg-none" 
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>

        {/* Collapsible menu */}
        <div className={`d-lg-flex ${isMenuOpen ? 'd-block' : 'd-none'} mobile-menu`}>
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 ms-lg-auto">
            {currentUser ? (
              <>
                <span className="text-muted d-none d-lg-block">{currentUser.email}</span>
                
                <div className="d-flex flex-column flex-lg-row gap-2">
                  <Link to="/home" className="btn btn-outline-secondary">
                    Home
                  </Link>
                  <Link to="/favorites" className="btn btn-outline-secondary">
                    Favorites
                  </Link>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column flex-lg-row gap-2">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowRegister(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Register
                </button>
              </div>
            )}
            
            <button 
              onClick={toggleTheme}
              className="btn btn-link text-decoration-none"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
            </button>
          </div>
        </div>
      </div>

      <AuthModal 
        show={showLogin} 
        handleClose={() => setShowLogin(false)} 
        isLogin={true} 
      />
      <AuthModal 
        show={showRegister} 
        handleClose={() => setShowRegister(false)} 
        isLogin={false} 
      />
    </header>
  );
};

export default Header;