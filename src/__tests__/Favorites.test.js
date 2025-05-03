import { render, screen, waitFor } from '@testing-library/react';
import Favorites from '../pages/Favorites';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../services/favorites';

jest.mock('../context/AuthContext');
jest.mock('../services/favorites');

describe('Favorites', () => {
  const mockFavorites = [
    {
      code: 'USA',
      name: 'United States',
      flag: 'https://flagcdn.com/us.png'
    }
  ];

  beforeEach(() => {
    useAuth.mockReturnValue({ currentUser: { uid: '123' } });
    getFavorites.mockResolvedValue(mockFavorites);
  });

  it('shows login prompt when not logged in', () => {
    useAuth.mockReturnValue({ currentUser: null });
    render(<Favorites />);
    expect(screen.getByText('Please login to view favorites')).toBeInTheDocument();
  });

  it('displays favorites for logged in users', async () => {
    render(<Favorites />);
    await waitFor(() => {
      expect(screen.getByText('Your Favorite Countries')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
  });

  it('shows empty state when no favorites', async () => {
    getFavorites.mockResolvedValue([]);
    render(<Favorites />);
    await waitFor(() => {
      expect(screen.getByText('No favorites yet')).toBeInTheDocument();
    });
  });
});