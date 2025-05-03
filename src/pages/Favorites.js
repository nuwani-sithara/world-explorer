import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../services/favorites';
import CountryCard from '../components/CountryCard';
import { motion } from 'framer-motion';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const loadFavorites = async () => {
        const favs = await getFavorites(currentUser.uid);
        setFavorites(favs);
        setLoading(false);
      };
      loadFavorites();
    }
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
      <h2 className="mb-4">Your Favorite Countries</h2>
      {favorites.length === 0 ? (
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
          {favorites.map((fav) => (
            <div key={fav.code} className="col">
              <CountryCard 
                country={{
                  flags: { png: fav.flag },
                  name: { common: fav.name },
                  cca3: fav.code,
                  // Add other required properties with dummy data if needed
                  population: 0,
                  region: 'Unknown',
                  capital: ['Unknown']
                }} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;