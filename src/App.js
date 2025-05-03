import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Routes>
            {/* Landing Page (No Header) */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Main App Routes (With Header) */}
            <Route path="/home" element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            } />
            
            {/* Country Details Page (With Header) */}
            <Route path="/country/:code" element={
              <>
                <Header />
                <CountryPage />
                <Footer />
              </>
            } />

            {/* Favorites Page (Protected Route) */}
            <Route path="/favorites" element={
              <ProtectedRoute>
                <>
                  <Header />
                  <Favorites />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;