// import React, {useState} from 'react';
// import { CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CBadge } from '@coreui/react';
// // import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI styles

// const BillingHistory = () => {
//   // Dummy data for billing history
//   const billingData = [
//     { date: '2024-09-01', invoice: 'INV001', amount: '$150.00', status: 'Paid' },
//     { date: '2024-08-15', invoice: 'INV002', amount: '$200.00', status: 'Pending' },
//     { date: '2024-07-22', invoice: 'INV003', amount: '$175.00', status: 'Paid' },
//     { date: '2024-06-10', invoice: 'INV004', amount: '$100.00', status: 'Failed' },
//     { date: '2024-05-25', invoice: 'INV005', amount: '$120.00', status: 'Paid' },
//     { date: '2024-06-10', invoice: 'INV006', amount: '$100.00', status: 'Failed' },
//     { date: '2024-05-25', invoice: 'INV007', amount: '$120.00', status: 'Paid' },
//   ];

//   // Function to render the badge based on payment status
//   const renderStatusBadge = (status) => {
//     switch (status) {
//       case 'Paid':
//         return <CBadge color="success">Paid</CBadge>;
//       case 'Pending':
//         return <CBadge color="warning">Pending</CBadge>;
//       case 'Failed':
//         return <CBadge color="danger">Failed</CBadge>;
//       default:
//         return <CBadge color="secondary">Unknown</CBadge>;
//     }
//   };

//   // State to manage the current page
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Records per page
//   const totalPages = Math.ceil(billingData.length / itemsPerPage); // Total pages calculation

//   // Get the current items to display based on pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = billingData.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <CCard>
//       <CCardHeader>
//         <h5>Billing History</h5>
//       </CCardHeader>
//       <CCardBody>
//         <CTable hover responsive striped className="text-center">
//           <CTableHead>
//             <CTableRow>
//             <CTableHeaderCell>Order ID</CTableHeaderCell>
//               <CTableHeaderCell>Created</CTableHeaderCell>
              
//               <CTableHeaderCell>Amount</CTableHeaderCell>
//               <CTableHeaderCell>Status</CTableHeaderCell>
//               <CTableHeaderCell>Invoice</CTableHeaderCell>
//             </CTableRow>
//           </CTableHead>
//           <CTableBody>
//             {billingData.length>0 ? (
//             billingData.map((item, index) => (
//               <CTableRow key={index}>
//                 <CTableDataCell>{index+1}</CTableDataCell>
//                 <CTableDataCell>{item.date}</CTableDataCell>
//                 <CTableDataCell>{item.amount}</CTableDataCell>
//                 <CTableDataCell>{renderStatusBadge(item.status)}</CTableDataCell>
//                 <CTableDataCell>{item.invoice}</CTableDataCell>
//               </CTableRow>
//             ))
//         ) :  <CTableRow>
//         <CTableDataCell colSpan="5" className="text-center">
//           No Orders found
//         </CTableDataCell>
//       </CTableRow> }
//           </CTableBody>
//         </CTable>
//          {/* Bootstrap Pagination */}
//          <nav aria-label="Page navigation example" className="mt-3">
//           <ul className="pagination justify-content-center">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
//                 Previous
//               </a>
//             </li>
//             {[...Array(totalPages)].map((_, index) => (
//               <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
//                 <a className="page-link" onClick={() => handlePageChange(index + 1)}>
//                   {index + 1}
//                 </a>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
//                 Next
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </CCardBody>
//     </CCard>
//   );
// };

// export default BillingHistory;

import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CBadge } from '@coreui/react';
// import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { Link } from 'react-router-dom';

const BillingHistory = () => {
  // Dummy data for billing history
  const billingData = [
    { date: '2024-09-01', invoice: 'INV001', amount: '$150.00', status: 'Paid' },
    { date: '2024-08-15', invoice: 'INV002', amount: '$200.00', status: 'Pending' },
    { date: '2024-07-22', invoice: 'INV003', amount: '$175.00', status: 'Paid' },
    { date: '2024-06-10', invoice: 'INV004', amount: '$100.00', status: 'Failed' },
    { date: '2024-05-25', invoice: 'INV005', amount: '$120.00', status: 'Paid' },
    // { date: '2024-06-10', invoice: 'INV006', amount: '$100.00', status: 'Failed' },
    // { date: '2024-05-25', invoice: 'INV007', amount: '$120.00', status: 'Paid' },
  ];

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Records per page
  const totalPages = Math.ceil(billingData.length / itemsPerPage); // Total pages calculation

  // Get the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = billingData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to render the badge based on payment status
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <CBadge color="success">Paid</CBadge>;
      case 'Pending':
        return <CBadge color="warning">Pending</CBadge>;
      case 'Failed':
        return <CBadge color="danger">Failed</CBadge>;
      default:
        return <CBadge color="secondary">Unknown</CBadge>;
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <CCard style={{minHeight:'50vh'}} className=''>
      <CCardHeader>
        <h5>Billing History</h5>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive striped className="text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Order ID</CTableHeaderCell>
              <CTableHeaderCell>Created</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Invoice</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{indexOfFirstItem + index + 1}</CTableDataCell>
                  <CTableDataCell>{item.date}</CTableDataCell>
                  <CTableDataCell>{item.amount}</CTableDataCell>
                  <CTableDataCell>{renderStatusBadge(item.status)}</CTableDataCell>
                  <CTableDataCell><Link to={`/billing/payment`} className='btn btn-primary'>View</Link></CTableDataCell>

                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="5" className="text-center">
                  No Orders found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>

        
      </CCardBody>

      {/* Bootstrap Pagination */}
      {billingData.length > itemsPerPage && ( 
        <nav aria-label="Page navigation example" className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              <i className="bi bi-caret-left"></i>
              </a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <a className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              <i className="bi bi-caret-right"></i>
              </a>
            </li>
          </ul>
        </nav>
        )}
    </CCard>
  );
};

export default BillingHistory;
