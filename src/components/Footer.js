import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer py-5 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container" >
        <div className="row g-4">
          {/* About Section */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">World Explorer</h5>
            <p>
              Discover countries, cultures, and fascinating facts about our world.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-decoration-none me-3" aria-label="Twitter">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="https://github.com/nuwani-sithara/world-explorer" className="text-decoration-none me-3" aria-label="GitHub">
                <i className="bi bi-github fs-5"></i>
              </a>
              <a href="https://www.linkedin.com/in/nuwani-sithara" className="text-decoration-none" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h5 className="fw-bold mb-3">Explore</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/home" className="text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none">Continents</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none">Popular</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://restcountries.com/" className="text-decoration-none" target="_blank" rel="noopener noreferrer">
                  REST Countries API
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.worldbank.org/" className="text-decoration-none" target="_blank" rel="noopener noreferrer">
                  World Bank Data
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Stay Updated</h5>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email" 
                aria-label="Email" 
              />
              <button className="btn btn-primary" type="button">
                <i className="bi bi-send"></i>
              </button>
            </div>
            <small className="text-muted">We'll never share your email.</small>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top mt-4 pt-3 text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} World Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;