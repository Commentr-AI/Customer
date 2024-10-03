// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import './Dashboard.css'; // Import custom CSS file for styling

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <Container>
//         {/* Users and Requests Section */}
//         <div className="section">
//           <h2>Users and Requests</h2>
//           <Row>
//             <Col md={6}>
//               <div className="card">
//                 <h3>Total Users</h3>
//                 <p>21</p>
//               </div>
//             </Col>
//             <Col md={6}>
//               <div className="card">
//                 <h3>Contact Requests</h3>
//                 <p>26</p>
//               </div>
//             </Col>
//           </Row>
//         </div>

//         {/* Products and Categories Section */}
//         <div className="section">
//           <h2>Products and Categories</h2>
//           <Row>
//             <Col md={6}>
//               <div className="card">
//                 <h3>Total Categories</h3>
//                 <p>2</p>
//               </div>
//             </Col>
//             <Col md={6}>
//               <div className="card">
//                 <h3>Total Products</h3>
//                 <p>9</p>
//               </div>
//             </Col>
//           </Row>
//         </div>

//         {/* Orders Section */}
//         <div className="section">
//           <h2>Orders</h2>
//           {/* <Row>
//             {[1, 2, 3, 4, 5].map((index) => (
//               <Col md={4} key={index}>
//                 <div className="card">
//                   <h3>Total Orders</h3>
//                   <p>5</p>
//                 </div>
//               </Col>
//             ))}
//           </Row> */}
//           <Row className="section orders">
//   {[1, 2, 3, 4, 5].map((index) => (
//     <Col md={4} key={index}>
//       <div className="card">
//         <h3>Total Orders</h3>
//         <p>5</p>
//       </div>
//     </Col>
//   ))}
// </Row>

//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react'

const Dashboard = () => {
  console.log('This is Dash board page')
 const handleReddit = ()=>{
  window.location.href= `${import.meta.env.VITE_BASE_URL}/auth/reddit`
 }

  return (
    <div className="dashboard-container">
      <button className='btn btn-primary' onClick={handleReddit}>Login With Reddit</button>
    </div>
  )
}

export default Dashboard
