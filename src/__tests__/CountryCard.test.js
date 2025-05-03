import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../components/CountryCard';
import { useAuth } from '../context/AuthContext';

jest.mock('../context/AuthContext');
jest.mock('../services/favorites');

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  flags: { png: 'https://flagcdn.com/us.png' },
  population: 331000000,
  region: 'Americas',
  capital: ['Washington D.C.']
};

describe('CountryCard', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ currentUser: { uid: '123' } });
  });

  it('renders country information', () => {
    render(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Population: 331,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Americas')).toBeInTheDocument();
    expect(screen.getByText('Capital: Washington D.C.')).toBeInTheDocument();
  });

  it('shows favorite button for logged in users', () => {
    render(<CountryCard country={mockCountry} />);
    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
  });

  it('does not show favorite button for non-logged in users', () => {
    useAuth.mockReturnValue({ currentUser: null });
    render(<CountryCard country={mockCountry} />);
    expect(screen.queryByLabelText('Add to favorites')).not.toBeInTheDocument();
  });
});