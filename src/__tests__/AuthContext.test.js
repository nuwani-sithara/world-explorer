import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';

// Mock Firebase auth methods
jest.mock('../firebase/config', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn()
  }
}));

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide initial context values', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.currentUser).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it('should handle login', async () => {
    const mockUser = { email: 'test@example.com' };
    auth.signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
      await waitForNextUpdate();
    });
    
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
    expect(result.current.currentUser).toEqual(mockUser);
  });
});