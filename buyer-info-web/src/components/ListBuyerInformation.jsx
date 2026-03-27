import { useState, useEffect } from 'react';
import './ListBuyerInformation.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

const ListBuyerInformation = ({ onBackToHome }) => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [buyerToDelete, setBuyerToDelete] = useState(null);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/api/buyer-info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBuyers(data);
      } else {
        setError('Failed to fetch buyer information. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching buyers:', err);
      setError('Network error. Please ensure the backend server is running on port 8081.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (buyerId, firstName) => {
    setBuyerToDelete({ id: buyerId, firstName });
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!buyerToDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/buyer-info/${buyerToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // Remove the buyer from the UI
        setBuyers(buyers.filter(buyer => buyer.id !== buyerToDelete.id));
        
        // Show success message
        setSuccessMessage(`Buyer '${buyerToDelete.firstName}' has been deleted successfully`);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        setError('Failed to delete buyer. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting buyer:', err);
      setError('Network error. Please ensure the backend server is running.');
    } finally {
      setShowDeleteDialog(false);
      setBuyerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setBuyerToDelete(null);
  };

  return (
    <div className="list-buyer-container">
      {onBackToHome && (
        <button className="back-button" onClick={onBackToHome}>
          ← Back to Home
        </button>
      )}
      
      <h1>Buyer Information List</h1>

      {successMessage && (
        <div className="success-message-box">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="error-message-box">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading buyer information...</p>
        </div>
      ) : buyers.length === 0 ? (
        <div className="no-data">
          <p>No buyer information found.</p>
          <p className="no-data-hint">Add some buyers to see them here!</p>
        </div>
      ) : (
        <div className="buyers-grid">
          {buyers.map((buyer) => (
            <div key={buyer.id} className="buyer-card">
              <div className="buyer-header">
                <h3>{buyer.firstName} {buyer.lastName}</h3>
              </div>
              
              <div className="buyer-details">
                <div className="detail-row">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">{buyer.addressLine1}</span>
                </div>
                
                {buyer.addressLine2 && (
                  <div className="detail-row">
                    <span className="detail-label"></span>
                    <span className="detail-value">{buyer.addressLine2}</span>
                  </div>
                )}
                
                <div className="detail-row">
                  <span className="detail-label">City:</span>
                  <span className="detail-value">{buyer.city}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">State:</span>
                  <span className="detail-value">{buyer.state}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Country:</span>
                  <span className="detail-value">{buyer.country}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{buyer.phoneNumber}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value email">{buyer.emailAddress}</span>
                </div>
              </div>
              
              <button 
                className="delete-button" 
                onClick={() => handleDelete(buyer.id, buyer.firstName)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {showDeleteDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Delete Buyer</h3>
            <p>Are you sure you want to delete <strong>{buyerToDelete?.firstName}</strong>?</p>
            <div className="dialog-buttons">
              <button className="dialog-button yes-button" onClick={confirmDelete}>
                Yes
              </button>
              <button className="dialog-button no-button" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBuyerInformation;
