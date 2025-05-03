// src/components/Header.js
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import { useState, useContext } from 'react';


const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className="app-header navbar navbar-expand-lg shadow-sm">
      <div className="container" >
        <Link to="/" className="navbar-brand d-flex align-items-center">
        <img 
            src="/aflogo.png" 
            alt="World Explorer Logo" 
            style={{ height: '30px', marginRight: '15px' }} 
          />
          <h1 className="m-0 fs-4 fw-bold">World Explorer</h1>
        </Link>
        <div className="d-flex align-items-center gap-3">
          {currentUser ? (
            
            <>
              <span className="text-muted">{currentUser.email}</span>

              <button 
                className="btn btn-outline-secondary"
                onClick={logout}
              >
                Logout
              </button>
              <Link to="/favorites" className="btn btn-outline-secondary ms-2">
                Favorites
              </Link>

              <Link to="/home" className="btn btn-outline-secondary ms-2">
                Home
              </Link>

              
            </>
          ) : (
            <>
              <button 
                className="btn btn-outline-primary"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </>
          )}
          <div className="d-flex align-items-center">
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