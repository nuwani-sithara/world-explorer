import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../services/favorites';
import { getCountryByCode } from '../services/api';
import CountryCard from '../components/CountryCard';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoriteCountries = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      // 1. Get favorite country codes from Firebase
      const favoriteCodes = await getFavorites(currentUser.uid);
      
      // 2. Fetch complete country data for each code
      const countriesPromises = favoriteCodes.map(code => 
        getCountryByCode(code).then(res => res.data[0])
      );
      
      // 3. Wait for all requests to complete
      const countries = await Promise.all(countriesPromises);
      setFavoriteCountries(countries);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteCountries();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container py-5 text-center">
        <h3>Please login to view favorites</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Your Favorite Countries</h2>
      
      {favoriteCountries.length === 0 ? (
        <motion.div 
          className="text-center py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-muted">No favorites yet</h3>
          <p>Add countries to your favorites by clicking the heart icon</p>
        </motion.div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {favoriteCountries.map((country) => (
            <div key={country.cca3} className="col">
              <CountryCard country={country} />
            </div>
            
          ))}
        </div>
        
      )}
    </div>
  );
};

export default Favorites;