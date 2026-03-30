import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const username = authService.getUsername();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="homepage-container">
      <div className="user-info-bar">
        <span className="welcome-text">Welcome, {username}!</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="homepage-content">
        <h1>Welcome to Buyer Information System</h1>
        <p className="homepage-description">
          Manage and store buyer information efficiently and securely
        </p>
        <div className="button-group">
          <Link to="/add-buyer">
            <button className="add-buyer-button">
              Add Buyer Information
            </button>
          </Link>
          <Link to="/buyer-list">
            <button className="view-list-button">
              View Buyer List
            </button>
          </Link>
          <Link to="/letstry">
            <button className="letstry-button">
              Explore Platforms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
