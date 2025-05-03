// src/components/CountryDetails.js
import { motion } from 'framer-motion';

const CountryDetails = ({ country }) => {
  const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

  return (
    <motion.div 
      className="country-details row g-4 align-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="col-lg-6">
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          className="img-fluid rounded shadow"
        />
      </div>
      <div className="col-lg-6">
        <h2 className="mb-4 fw-bold">{country.name.common}</h2>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-2"><span className="fw-semibold">Official Name:</span> {country.name.official}</li>
              <li className="mb-2"><span className="fw-semibold">Population:</span> {country.population.toLocaleString()}</li>
              <li className="mb-2"><span className="fw-semibold">Region:</span> {country.region}</li>
              <li className="mb-2"><span className="fw-semibold">Subregion:</span> {country.subregion || 'N/A'}</li>
              <li><span className="fw-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-2"><span className="fw-semibold">Top Level Domain:</span> {country.tld?.join(', ') || 'N/A'}</li>
              <li className="mb-2"><span className="fw-semibold">Currencies:</span> {currencies}</li>
              <li><span className="fw-semibold">Languages:</span> {languages}</li>
            </ul>
          </div>
        </div>

        {country.borders && (
          <div className="border-top pt-4">
            <h3 className="h6 fw-semibold mb-3">Border Countries:</h3>
            <div className="d-flex flex-wrap gap-2">
              {country.borders.map(border => (
                <span key={border} className="badge bg-secondary-subtle text-secondary-emphasis">
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CountryDetails;