// src/components/LandingPage.js
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../stylesheet/LandingPage.css";
// import logo from "../images/aflogo.png"; // adjust the path if needed

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* Centered content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="landing-content"
      >
        <h1>Discover Our World</h1>
        <p>Explore countries, cultures, and more</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="explore-btn"
          onClick={() => navigate("/home")}
        >
          {/* <img 
          src={logo} 
          alt="Logo" 
          className="button-logo" 
        /> */}
        World Explorer
        </motion.button>
      </motion.div>

      {/* Copyright text */}
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} World Explorer. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
