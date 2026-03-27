import { useState } from 'react'
import './App.css'
import Homepage from './components/Homepage'
import BuyerInfoDetails from './components/BuyerInfoDetails'
import ListBuyerInformation from './components/ListBuyerInformation'

function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleAddBuyerInfo = () => {
    setCurrentView('add');
  };

  const handleViewBuyerList = () => {
    setCurrentView('list');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="app">
      {currentView === 'home' && (
        <Homepage 
          onAddBuyerInfo={handleAddBuyerInfo} 
          onViewBuyerList={handleViewBuyerList}
        />
      )}
      {currentView === 'add' && (
        <BuyerInfoDetails onBackToHome={handleBackToHome} />
      )}
      {currentView === 'list' && (
        <ListBuyerInformation onBackToHome={handleBackToHome} />
      )}
    </div>
  )
}

export default App

