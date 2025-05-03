import { motion } from 'framer-motion';

const Filter = ({ onFilter, selectedRegion }) => {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleChange = (e) => {
    const region = e.target.value.toLowerCase();
    onFilter(region === 'all' ? 'all' : region);
  };

  return (
    <motion.div 
      className="filter-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <select 
        className="form-select shadow-sm"
        onChange={handleChange}
        value={selectedRegion}
        aria-label="Filter countries by region"
      >
        <option value="all">Filter by Region</option>
        {regions.map(region => (
          <option key={region} value={region.toLowerCase()}>
            {region}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default Filter;