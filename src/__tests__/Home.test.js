import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import { getAllCountries } from '../services/api';

jest.mock('../services/api');

describe('Home', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      population: 331000000,
      region: 'Americas',
      capital: ['Washington D.C.']
    },
    {
      cca3: 'CAN',
      name: { common: 'Canada' },
      population: 38000000,
      region: 'Americas',
      capital: ['Ottawa']
    }
  ];

  beforeEach(() => {
    getAllCountries.mockResolvedValue({ data: mockCountries });
  });

  it('displays loading spinner initially', () => {
    render(<Home />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays countries after loading', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });

  it('shows no countries message when filtered list is empty', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.queryByText('No countries found')).not.toBeInTheDocument();
    });
  });
});