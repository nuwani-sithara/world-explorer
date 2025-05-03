// src/components/CountryPage.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import CountryDetails from '../components/CountryDetails';
import { motion } from 'framer-motion';

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await getCountryByCode(code);
        setCountry(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError('Country not found');
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container py-5 text-center">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  return (
    <div className="country-page container py-5">
      <motion.button 
        onClick={() => window.history.back()} 
        className="btn btn-outline-secondary mb-5 d-flex align-items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <i className="bi bi-arrow-left"></i> Back
      </motion.button>
      {country && <CountryDetails country={country} />}
    </div>
  );
};

export default CountryPage;