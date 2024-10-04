import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  console.log('This is Dash board page')
  
  const [isVisible, setIsVisible] = useState(true);
  const user =useSelector((state)=>state.auth.userInfo)
  console.log(user);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    // Your submit logic here
    console.log("Submitted!");
    window.location.href= `${import.meta.env.VITE_BASE_URL}/auth/reddit`
    handleClose(); // Optionally close the message after submission
  };

  if (!isVisible) {
    return null; // Don't render if the message is not visible
  }

 const handleReddit = ()=>{
  window.location.href= `${import.meta.env.VITE_BASE_URL}/auth/reddit`
 }

  return (
    <div className="dashboard-container">
      {!user?.reddit_username &&      
      <div className="alert alert-info d-flex justify-content-between align-items-center" role="alert">
      
      <div>
      <span>Kindly add your Reddit account here!</span>
        <button onClick={handleSubmit} className="btn ms-3 " style={{backgroundColor:"#FF4500", color:"white"}}>
          ADD Reddit
        </button>
        
      </div>
      <button onClick={handleClose} className="btn btn-close">
        {/* <i className="bi bi-x-square"></i> */}
        </button>
    </div>
    }
    </div>
  )
}

export default Dashboard
