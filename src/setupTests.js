import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Optional: Configure test timeout
configure({ asyncUtilTimeout: 5000 });

// Mock window.matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};