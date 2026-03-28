import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
