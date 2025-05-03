import { useState, useEffect } from 'react';
import { getAllCountries, getCountriesByRegion } from '../services/api';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Filter from '../components/Filter';
import { motion } from 'framer-motion';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [refreshFavorites, setRefreshFavorites] = useState(false); // Moved inside the component

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getAllCountries();
        setCountries(response.data);
        setFilteredCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    // Apply both search and filter whenever either changes
    const applyFilters = () => {
      let result = [...countries];
      
      // Apply region filter first
      if (selectedRegion !== 'all') {
        result = result.filter(country => 
          country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
      }
      
      // Then apply search term
      if (searchTerm) {
        result = result.filter(country => 
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setFilteredCountries(result);
    };

    if (countries.length) {
      applyFilters();
    }
  }, [searchTerm, selectedRegion, countries]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (region) => {
    setSelectedRegion(region);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="home container py-5">
      <div className="controls row mb-5 g-3">
        <div className="col-md-6">
          <Search onSearch={handleSearch} />
        </div>
        <div className="col-md-3 ms-auto">
          <Filter onFilter={handleFilter} selectedRegion={selectedRegion} />
        </div>
      </div>
      
      {filteredCountries.length === 0 ? (
        <motion.div 
          className="text-center py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-muted">No countries found</h3>
          <p>Try adjusting your search or filter</p>
        </motion.div>
      ) : (
        <div className="countries-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredCountries.map((country) => (
            <div key={country.cca3} className="col">
              <CountryCard 
                country={country} 
                onFavoriteUpdate={() => setRefreshFavorites(!refreshFavorites)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;