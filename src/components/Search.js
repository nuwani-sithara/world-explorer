import { motion } from 'framer-motion';
import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // Add debounce to prevent too many rapid searches
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <motion.form 
      className="search-form position-relative"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <input
        type="text"
        className="form-control shadow-sm ps-5"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search for countries"
      />
      <button 
        type="submit" 
        className="btn btn-link position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
        aria-label="Search"
      >
        <i className="bi bi-search"></i>
      </button>
    </motion.form>
  );
};

export default Search;