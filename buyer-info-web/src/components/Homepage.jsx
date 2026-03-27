import './Homepage.css';

const Homepage = ({ onAddBuyerInfo, onViewBuyerList }) => {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1>Welcome to Buyer Information System</h1>
        <p className="homepage-description">
          Manage and store buyer information efficiently and securely
        </p>
        <div className="button-group">
          <button 
            className="add-buyer-button"
            onClick={onAddBuyerInfo}
          >
            Add Buyer Information
          </button>
          <button 
            className="view-list-button"
            onClick={onViewBuyerList}
          >
            View Buyer List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
