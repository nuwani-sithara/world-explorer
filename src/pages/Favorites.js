import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getCountryByCode } from '../services/api';
import CountryCard from '../components/CountryCard';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        // 1. Create reference to the user's favorites subcollection
        const favoritesRef = collection(db, 'users', currentUser.uid, 'favorites');
        
        // 2. Set up real-time listener
        const unsubscribe = onSnapshot(favoritesRef, async (snapshot) => {
          const favoriteCodes = snapshot.docs.map(doc => doc.data().code);
          
          // 3. Fetch complete country data for each favorite
          const countriesPromises = favoriteCodes.map(code => 
            getCountryByCode(code)
              .then(res => res.data[0])
              .catch(() => null) // Skip failed fetches
          );

          const countries = (await Promise.all(countriesPromises)).filter(Boolean);
          setFavoriteCountries(countries);
          setLoading(false);
        });

        return () => unsubscribe(); // Cleanup on unmount

      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error('Failed to load favorites');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser, db]);

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
              <CountryCard 
                country={country}
                onFavoriteUpdate={() => setFavoriteCountries(prev => [...prev])} // Force re-render
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;