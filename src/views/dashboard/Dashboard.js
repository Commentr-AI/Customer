
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

const Dashboard = () => {
  console.log('This is Dashboard page');

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [isViewVisible, setIsViewVisible] = useState(true); // State for the View section
  const [isRedditVisible, setIsRedditVisible] = useState(true); // State for the Add Reddit section
  const user = useSelector((state) => state.auth.userInfo);
  console.log(user);

  const handleCloseView = () => {
    setIsViewVisible(false);
  };

  const handleCloseReddit = () => {
    setIsRedditVisible(false);
  };

  const handleSubmit = () => {
    // Your submit logic here
    console.log('Submitted!');
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/reddit`;
    handleCloseReddit(); // Optionally close the Reddit message after submission
  };

  const handleView = () => {
    console.log('View Submitted!');
  };

  return (
    <div className="dashboard-container">
      {sessionId && isViewVisible && (
        <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
          <div>
            <span>Payment Successful!</span>
            <Link to={`/success?session_id=${sessionId}`}>
            <button  className="btn ms-3 btn-success">
              View
            </button>
            </Link>
          </div>
          <button onClick={handleCloseView} className="btn btn-close"></button>
        </div>
      )}
      
      {!user?.reddit_username && isRedditVisible && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center" role="alert">
          <div>
            <span>Kindly add your Reddit account here!</span>
            <button onClick={handleSubmit} className="btn ms-3" style={{ backgroundColor: '#FF4500', color: 'white' }}>
              ADD Reddit
            </button>
          </div>
          <button onClick={handleCloseReddit} className="btn btn-close"></button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
