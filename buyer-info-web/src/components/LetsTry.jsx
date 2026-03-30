import { useState } from 'react';
import './LetsTry.css';

const LetsTry = () => {
  const [platforms] = useState([
    {
      id: 1,
      name: 'Platform Alpha',
      icon: 'A',
      keyFeatures: 10,
      rating: 4.3,
      reviews: 655,
      iconColor: '#fa0f00'
    },
    {
      id: 2,
      name: 'Platform Beta',
      icon: 'B',
      keyFeatures: 10,
      rating: 4.3,
      reviews: 58,
      iconColor: '#00a651'
    },
    {
      id: 3,
      name: 'Platform Gamma',
      icon: 'G',
      keyFeatures: 10,
      rating: 4.2,
      reviews: 1944,
      iconColor: '#1f3864'
    },
    {
      id: 4,
      name: 'Platform Delta',
      icon: 'D',
      keyFeatures: 6,
      rating: 4.4,
      reviews: 190,
      iconColor: '#ff6600'
    }
  ]);

  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }
    return stars;
  };

  const getFeatureBarClass = (score) => {
    if (score >= 9) return 'feature-bar excellent';
    if (score >= 7) return 'feature-bar good';
    return 'feature-bar average';
  };

  return (
    <div className="letstry-container">
      <header className="letstry-header">
        <h1>900+ Categories</h1>
      </header>

      <div className="platforms-list">
        {platforms.map((platform) => (
          <div key={platform.id} className="platform-card">
            <div className="platform-info">
              <div className="platform-icon" style={{ backgroundColor: platform.iconColor }}>
                {platform.icon}
              </div>
              <h2 className="platform-name">
                {platform.name} <span className="external-link">↗</span>
              </h2>
            </div>

            <div className="platform-details">
              <div className="key-features">
                <h3>KEY FEATURES</h3>
                <div className="feature-score">
                  <div className={getFeatureBarClass(platform.keyFeatures)}>
                    <div 
                      className="feature-fill" 
                      style={{ width: `${(platform.keyFeatures / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="score-text">{platform.keyFeatures}/10</span>
                  <span className="info-icon">ⓘ</span>
                </div>
              </div>

              <div className="rating-section">
                <h3>RATING</h3>
                <div className="rating-display">
                  <div className="stars-container">
                    {getStars(platform.rating)}
                  </div>
                  <span className="rating-score">
                    {platform.rating} ({platform.reviews})
                  </span>
                </div>
              </div>

              <button className="visit-btn">
                VISIT WEBSITE ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetsTry;
