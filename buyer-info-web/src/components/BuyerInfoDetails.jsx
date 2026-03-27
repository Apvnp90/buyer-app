import { useState } from 'react';
import './BuyerInfoDetails.css';

const BuyerInfoDetails = ({ onBackToHome }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    addressline1: '',
    city: '',
    state: '',
    country: '',
    phonenumber: '',
    emailaddress: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstname':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (!/^[A-Za-z]+$/.test(value)) {
          error = 'First name must contain only alphabetic characters';
        } else if (value.length > 20) {
          error = 'First name must not exceed 20 characters';
        }
        break;

      case 'lastname':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (!/^[A-Za-z]+$/.test(value)) {
          error = 'Last name must contain only alphabetic characters';
        } else if (value.length > 20) {
          error = 'Last name must not exceed 20 characters';
        }
        break;

      case 'addressline1':
        if (!value.trim()) {
          error = 'Address line 1 is required';
        } else if (!/^[A-Za-z0-9\s]+$/.test(value)) {
          error = 'Address must contain only alphanumeric characters';
        } else if (value.length > 30) {
          error = 'Address must not exceed 30 characters';
        }
        break;

      case 'city':
        if (!value.trim()) {
          error = 'City is required';
        }
        break;

      case 'state':
        if (!value.trim()) {
          error = 'State is required';
        }
        break;

      case 'country':
        if (!value.trim()) {
          error = 'Country is required';
        }
        break;

      case 'phonenumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be exactly 10 digits';
        }
        break;

      case 'emailaddress':
        if (!value.trim()) {
          error = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Filter phone number to only allow digits and limit to 10
    let processedValue = value;
    if (name === 'phonenumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous submit message
    setSubmitMessage({ type: '', text: '' });

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the form to backend
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8081/api/buyer-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstname,
          lastName: formData.lastname,
          addressLine1: formData.addressline1,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          phoneNumber: formData.phonenumber,
          emailAddress: formData.emailaddress
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        setSubmitMessage({ type: 'success', text: 'Buyer information saved successfully!' });
        
        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          addressline1: '',
          city: '',
          state: '',
          country: '',
          phonenumber: '',
          emailaddress: ''
        });
        setErrors({});
        setTouched({});
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setSubmitMessage({ 
          type: 'error', 
          text: errorData.message || 'Failed to save buyer information. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Network error. Please ensure the backend server is running on port 8081.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="buyer-info-container">
      {onBackToHome && (
        <button className="back-button" onClick={onBackToHome}>
          ← Back to Home
        </button>
      )}
      <h1>Buyer Information</h1>
      
      {submitMessage.text && (
        <div className={`submit-message ${submitMessage.type}`}>
          {submitMessage.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="buyer-info-form">
        <div className="form-group">
          <label htmlFor="firstname">
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstname && touched.firstname ? 'error' : ''}
            maxLength="20"
          />
          {errors.firstname && touched.firstname && (
            <span className="error-message">{errors.firstname}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">
            Last Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastname && touched.lastname ? 'error' : ''}
            maxLength="20"
          />
          {errors.lastname && touched.lastname && (
            <span className="error-message">{errors.lastname}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="addressline1">
            Address Line 1 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="addressline1"
            name="addressline1"
            value={formData.addressline1}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.addressline1 && touched.addressline1 ? 'error' : ''}
            maxLength="30"
          />
          {errors.addressline1 && touched.addressline1 && (
            <span className="error-message">{errors.addressline1}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">
            City <span className="required">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.city && touched.city ? 'error' : ''}
          />
          {errors.city && touched.city && (
            <span className="error-message">{errors.city}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="state">
            State <span className="required">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.state && touched.state ? 'error' : ''}
          />
          {errors.state && touched.state && (
            <span className="error-message">{errors.state}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">
            Country <span className="required">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.country && touched.country ? 'error' : ''}
          />
          {errors.country && touched.country && (
            <span className="error-message">{errors.country}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phonenumber">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phonenumber && touched.phonenumber ? 'error' : ''}
            maxLength="10"
            placeholder="10 digits"
          />
          {errors.phonenumber && touched.phonenumber && (
            <span className="error-message">{errors.phonenumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="emailaddress">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="emailaddress"
            name="emailaddress"
            value={formData.emailaddress}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.emailaddress && touched.emailaddress ? 'error' : ''}
          />
          {errors.emailaddress && touched.emailaddress && (
            <span className="error-message">{errors.emailaddress}</span>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BuyerInfoDetails;
