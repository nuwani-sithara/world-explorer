import { useAuth } from '../context/AuthContext';
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CountryCard = ({ country, onFavoriteUpdate }) => {
  const { currentUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const checkFavoriteStatus = async () => {
        try {
          const favorites = await getFavorites(currentUser.uid);
          setIsFavorite(favorites.some(fav => fav.code === country.cca3));
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      };
      checkFavoriteStatus();
    }
  }, [currentUser, country.cca3]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      toast.info('Please login to add favorites');
      return;
    }
    
    setIsProcessing(true);
    try {
      if (isFavorite) {
        await removeFavorite(currentUser.uid, country.cca3);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await addFavorite(currentUser.uid, country);
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
      // Notify parent component about the update if needed
      if (onFavoriteUpdate) onFavoriteUpdate();
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error('Failed to update favorites');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      className="country-card card h-100 shadow-sm border-0 overflow-hidden position-relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {/* Favorite Button - Only for logged in users */}
      {currentUser && (
        <button 
          className={`position-absolute top-0 end-0 m-2 btn btn-sm ${isProcessing ? 'disabled' : ''}`}
          onClick={handleFavoriteToggle}
          style={{ 
            zIndex: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.23)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            outline: 'none'
          }}
          disabled={isProcessing}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i 
            className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
            style={{
              fontSize: '1.2rem',
              transition: 'color 0.2s ease-in-out'
            }}
          ></i>
        </button>
      )}

      {/* Card Content */}
      <div className="flag-container" style={{ height: '160px', overflow: 'hidden' }}>
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          className="card-img-top h-100 object-fit-cover"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title fs-5 fw-bold mb-3">{country.name.common}</h3>
        <ul className="list-unstyled mb-0">
          <li className="mb-1">
            <span className="fw-semibold">Population:</span> {country.population.toLocaleString()}
          </li>
          <li className="mb-1">
            <span className="fw-semibold">Region:</span> {country.region}
          </li>
          <li>
            <span className="fw-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
          </li>
        </ul>
      </div>

      <Link 
        to={`/country/${country.cca3}`} 
        className="stretched-link"
        style={{ zIndex: 1 }}
        aria-label={`View details of ${country.name.common}`}
      ></Link>
    </motion.div>
  );
};

export default CountryCard;