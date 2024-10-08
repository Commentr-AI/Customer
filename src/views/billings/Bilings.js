import React, { useState } from 'react'
import BillingHistory from './BillingHistory';
import Preferences from './Preferences';
import Pricing from './Pricing'

const Bilings = () => {

  const [activeTab, setActiveTab] = useState('biling-history');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'biling-history':
        return <BillingHistory/>;
      case 'preferences':
        return <Preferences/>;
      case 'pricing':
        return <Pricing/>;
      default:
        return null;
    }
  };


  return (
    <div className="">
      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '0.5rem' }}>
        <li className="nav-item ">
          <a
            className={`nav-link ${activeTab === 'biling-history' ? 'active' : ''}`}
            onClick={() => handleTabClick('biling-history')}
            href="#"
            style={{ fontWeight: 'bold', color: activeTab === 'biling-history' ? 'blue' : '#6c757d' }}
          >
            Billing History
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => handleTabClick('preferences')}
            href="#"
            style={{ fontWeight: 'bold', color: activeTab === 'preferences' ? 'blue' : '#6c757d' }}
          >
            Preferences
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => handleTabClick('pricing')}
            href="#"
            style={{ fontWeight: 'bold', color: activeTab === 'pricing' ? 'blue' : '#6c757d' }}
          >
            Pricing
          </a>
        </li>
        
      </ul>

      {/* Content Section */}
      <div className="tab-content ">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Bilings