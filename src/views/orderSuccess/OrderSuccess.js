// // import React, { useEffect, useState } from 'react'
// // import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CSpinner } from '@coreui/react'
// // import html2canvas from 'html2canvas'
// // import jsPDF from 'jspdf'
// // import { useLocation } from 'react-router-dom'
// // // import { useGetOrderBySessionIdQuery } from '../../app/service/orderSlice'
// // import Page404 from '../pages/page404/Page404'
// // // import InvoicePdf from '../../utils/InvoicePdf'
// // import axios from 'axios'

// // const OrderConfirmationPage = () => {
// //   const location = useLocation()
// //   const searchParams = new URLSearchParams(location.search)
// //   const sessionId = searchParams.get('session_id')
// //   console.log(sessionId)

// // //   const { data, isLoading, error } = useGetOrderBySessionIdQuery(sessionId)
// //   const [orderDetails, setOrderDetails] = useState(null)
// //     const [data,setData] = useState(null)
// //   useEffect(() => {
// //    const fetchData =async () =>{
// //     try{
// //         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/session/${sessionId}`,
// //             {withCredentials: true}
// //         );

// //         console.log(res);
         
// //     const order = res.data.order
// //     // if (data) {
// //     //   setOrderDetails(data)
// //     // }


// //     }catch(e){
// //         console.log(e)
// //     }

   
// //    }
// //    fetchData()
    
// //   }, [data])

// // //   const handleDownloadReceipt = async () => {
// // //     const input = document.getElementById('order-confirmation')
// // //     const canvas = await html2canvas(input)
// // //     const imgData = canvas.toDataURL('image/png')
// // //     const pdf = new jsPDF()
// // //     pdf.addImage(imgData, 'PNG', 0, 0)
// // //     pdf.save(order_confirmation_${orderDetails.orderId}.pdf)
// // //   }

// //   const formatAddress = ({ address, companyName, billingName }) => {
// //     if (
// //       address.line1 === '' &&
// //       address.line2 === '' &&
// //       address.city === '' &&
// //       address.state === '' &&
// //       address.postal_code === null
// //     ) {
// //       return (
// //         <>
// //           <div>{billingName}</div>
// //           <div>{companyName}</div>
// //           <div>{address.country}</div>
// //         </>
// //       )
// //     } else {
// //       return (
// //         <>
// //           <div>{companyName}</div>
// //           {address.line1}
// //           {address.line2 && <div>{address.line2}</div>}
// //           <div>
// //             {address.city}, {address.state} {address.postal_code}
// //           </div>
// //           <div>{address.country}</div>
// //         </>
// //       )
// //     }
// //   }


// // //   const { orderId, orderDateTime, amount, cardType, billingEmail, cardLast4 } = orderDetails

// //   return (
// //     <div id="order-confirmation">
// //         {data&&
// //       <CRow className="justify-content-center" style={{ padding: '20px' }}>
// //         <CCol md="8">
// //           <div style={{ marginBottom: '20px', textAlign: 'center' }}>
// //             <h2>Order Confirmation</h2>
// //             <p>{`We sent a confirmation email to ${billingEmail}. Below you will find all the information about your order.`}</p>
// //           </div>
// //           <CCard className="mb-4">
// //             <CCardBody>
// //               <h3 style={{ borderBottom: '1px solid #dee2e6', paddingBottom: '10px' }}>Details</h3>
// //               <div>
// //                 <strong>Your order number is</strong>{' '}
// //                 <span style={{ color: '#007bff' }}>#{orderId}</span>
// //               </div>
// //               <div>
// //                 <strong>Order Date & Time:</strong> {new Date(orderDateTime).toLocaleString()}
// //               </div>
// //               <div style={{ paddingBottom: '10px' }}>
// //                 <strong>Amount:</strong> $ {amount.toFixed(2)}
// //               </div>

// //               <CRow>
// //                 <CCol>
// //                   <h4 style={{ borderBottom: '1px solid #dee2e6', paddingBottom: '10px' }}>
// //                     Payment Method
// //                   </h4>
// //                   <div>
// //                     <img
// //                       src={`https://img.icons8.com/?size=100&id=f6f4NTIAYAPC&format=png&color=000000`}
// //                       alt={cardType}
// //                       style={{ width: '24px', marginRight: '10px' }}
// //                     />
// //                     {`${cardType[0].toUpperCase() + cardType.slice(1)} ending in ${cardLast4}`}
// //                   </div>
// //                 </CCol>
// //                 <CCol>
// //                   <h4 style={{ borderBottom: '1px solid #dee2e6', paddingBottom: '10px' }}>
// //                     Address
// //                   </h4>
// //                   {formatAddress(orderDetails)}
// //                 </CCol>
// //               </CRow>
// //               <h3 style={{ borderBottom: '1px solid #dee2e6', paddingBottom: '10px' }}>Summary</h3>
// //               <div
// //                 style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}
// //               >
// //                 <strong>Total</strong>
// //                 <strong>$ {amount.toFixed(2)}</strong>
// //               </div>
// //               <div style={{ textAlign: 'center', marginTop: '20px' }}>
// //                 <InvoicePdf orderDetails={orderDetails} />
// //               </div>
// //             </CCardBody>
// //           </CCard>
// //         </CCol>
// //       </CRow>
// //       }
// //     </div>
// //   )
// // }

// // export default OrderConfirmationPage

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   CContainer,
//   CRow,
//   CCol,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CSpinner,
//   CAlert,
// } from '@coreui/react';

// const OrderConfirmationPage = () => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get('session_id');
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/v1/orders/session/${sessionId}`,
//           { withCredentials: true }
//         );
//         setOrderDetails(res.data.order);
//       } catch (err) {
//         setError('Failed to fetch order details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (sessionId) {
//       fetchOrderDetails();
//     }
//   }, [sessionId]);

//   if (loading) {
//     return (
//       <CContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <CSpinner color="primary" />
//       </CContainer>
//     );
//   }

//   if (error) {
//     return (
//       <CContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <CAlert color="danger">{error}</CAlert>
//       </CContainer>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <CContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <CAlert color="warning">No order details found.</CAlert>
//       </CContainer>
//     );
//   }

//   return (
//     <CContainer>
//       <CRow className="justify-content-center">
//         <CCol xs={12} md={8} lg={6}>
//           <CCard>
//             <CCardHeader className="bg-primary text-white">
//               <h3>Order Confirmation</h3>
//             </CCardHeader>
//             <CCardBody>
//               <h5 className="mb-4">Thank you for your order, {orderDetails.name}!</h5>
//               <CRow>
//                 <CCol>
//                   <p><strong>Order Date:</strong> {new Date(orderDetails.orderDateTime).toLocaleString()}</p>
//                   <p><strong>Amount:</strong> ${orderDetails.amount}</p>
//                   <p><strong>Email:</strong> {orderDetails.email}</p>
//                   <p><strong>Plan:</strong> {orderDetails.planTitle}</p>
//                   <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
//                 </CCol>
//                 <CCol>
//                   <p><strong>Card Type:</strong> {orderDetails.cardType}</p>
//                   <p><strong>Card Last 4 Digits:</strong> {orderDetails.cardLast4}</p>
//                   <p><strong>Card Expiry:</strong> {orderDetails.cardExpMonth}/{orderDetails.cardExpYear}</p>
//                   <p><strong>Payment Mode:</strong> {orderDetails.paymentMode}</p>
//                   <p><strong>Client Ref ID:</strong> {orderDetails.clientReferenceId}</p>
//                 </CCol>
//               </CRow>
//               <p className="text-muted">Stripe Confirmation ID: {orderDetails.stripeConfirmation}</p>
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </CContainer>
//   );
// };

// export default OrderConfirmationPage;

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CAlert,
  CButton,
} from '@coreui/react';

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/orders/session/${sessionId}`,
          { withCredentials: true }
        );
        setOrderDetails(res.data.order);
      } catch (err) {
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <CContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <CSpinner color="primary" />
      </CContainer>
    );
  }

  if (error) {
    return (
      <CContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <CAlert color="danger">{error}</CAlert>
      </CContainer>
    );
  }

  if (!orderDetails) {
    return (
      <CContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <CAlert color="warning">No order details found.</CAlert>
      </CContainer>
    );
  }

  return (
    <CContainer>
      <CRow className="justify-content-center mt-5">
        <CCol xs={12} md={8} lg={6}>
          <CCard className="shadow-lg border-0">
            <CCardHeader className="bg-success text-white text-center">
              <h3>Order Confirmed!</h3>
            </CCardHeader>
            <CCardBody>
              <h5 className="mb-4 text-center">Thank you, {orderDetails.name}!</h5>
              <CRow className="mb-3">
                <CCol xs={12} className="text-center">
                  <h6 className="text-muted">Order Date:</h6>
                  <p>{new Date(orderDetails.orderDateTime).toLocaleString()}</p>
                </CCol>
                <CCol xs={12} className="text-center">
                  <h6 className="text-muted">Amount Paid:</h6>
                  <p className="h5 text-primary">${orderDetails.amount}</p>
                </CCol>
              </CRow>

              <hr />

              <CRow>
                <CCol xs={12} md={6} className="mb-4">
                  <h6 className="text-muted">Plan:</h6>
                  <p>{orderDetails.planTitle}</p>
                  <h6 className="text-muted">Payment Mode:</h6>
                  <p>{orderDetails.paymentMode}</p>
                  <h6 className="text-muted">Payment Status:</h6>
                  <p className={`text-${orderDetails.paymentStatus === 'succeeded' ? 'success' : 'danger'}`}>
                    {orderDetails.paymentStatus.toUpperCase()}
                  </p>
                </CCol>

                <CCol xs={12} md={6} className="mb-4">
                  <h6 className="text-muted">Card Type:</h6>
                  <p>{orderDetails.cardType.toUpperCase()}</p>
                  <h6 className="text-muted">Card Last 4 Digits:</h6>
                  <p>**** **** **** {orderDetails.cardLast4}</p>
                  <h6 className="text-muted">Card Expiry:</h6>
                  <p>{orderDetails.cardExpMonth}/{orderDetails.cardExpYear}</p>
                </CCol>
              </CRow>

              <hr />

              {/* <CRow className="mb-4">
                <CCol xs={12} className="text-center">
                  <h6 className="text-muted">Stripe Confirmation ID:</h6>
                  <p>{orderDetails.stripeConfirmation}</p>
                </CCol>
              </CRow> */}

              <div className="d-flex justify-content-center">
                <CButton color="primary" onClick={() => window.print()}>Print Receipt</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default OrderConfirmationPage;

