import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import axios from 'axios'
// import html2pdf from "html2pdf.js";

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
} from '@coreui/react'

const OrderConfirmationPage = () => {
  //   const [searchParams] = useSearchParams()
  //   const sessionId = searchParams.get('session_id')

  const { id } = useParams()

  const [invoice, setinvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const invoiceRef = useRef()

  useEffect(() => {
    const fetchinvoice = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/orders/${id}`, {
          withCredentials: true,
        })
        console.log(res)
        setinvoice(res.data.invoice)
      } catch (err) {
        setError('Failed to fetch order details.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchinvoice()
    }
  }, [id])

  if (loading) {
    return (
      <CContainer
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <CSpinner color="primary" />
      </CContainer>
    )
  }

  const handleDownload = () => {
    //   const invoice = invoiceRef.current;
    // const opt = {
    //   margin: 1,
    //   // filename: `invoice_${invoiceData.invoiceNumber}.pdf`,
    //   filename: `invoice_0`,
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    // };
    // html2pdf().from(invoice).set(opt).save(); // Download the PDF
  }

  if (error) {
    return (
      <CContainer
        className="d-flex justify-content-center align-items-start mt-5"
        style={{ minHeight: '100vh' }}
      >
        <CAlert color="danger mt-5">{error}</CAlert>
      </CContainer>
    )
  }

  return (
    <CContainer>
      {invoice && (
        <CRow>
          <CCol xs={12} md={12} lg={12} ref={invoiceRef}>
            <CCard className="shadow-lg border-0">
              <CCardHeader className=" text-center">
                <h3>Payment Confirmed!</h3>
              </CCardHeader>
              <CCardBody>
                <h5 className="mb-4 text-center">Thank you, {invoice.name}!</h5>
                <CRow className="mb-3">
                  <CCol xs={12} className="text-center">
                    <h6 className="text-muted">Payment Date:</h6>
                    <p>{new Date(invoice.paidAt).toLocaleDateString()}</p>
                  </CCol>
                  <CCol xs={12} className="text-center">
                    <h6 className="text-muted">Amount Paid:</h6>
                    <p className="h5 text-primary">${invoice.amount}</p>
                  </CCol>
                </CRow>

                <hr />

                <CRow>
                  <CCol xs={12} md={6} className="mb-4">
                    <h6 className="text-muted">Plan:</h6>
                    <p>{invoice.planTitle}</p>
                    <h6 className="text-muted">Payment Mode:</h6>
                    <p>{invoice.paymentMode}</p>
                    <h6 className="text-muted">Payment Status:</h6>
                    <p className="text-success">
                      {invoice.paymentStatus === 'succeeded' ? 'Success' : 'Failed'}
                    </p>
                  </CCol>

                  <CCol xs={12} md={6} className="mb-4">
                    <h6 className="text-muted">Card Type:</h6>
                    <p>{invoice.cardType}</p>
                    <h6 className="text-muted">Card Last 4 Digits:</h6>
                    <p>**** **** **** {invoice.cardLast4}</p>
                    <h6 className="text-muted">Card Expiry:</h6>
                    <p>
                      {invoice.cardExpMonth}/{invoice.cardExpYear}
                    </p>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={12} md={12} lg={12} className="text-center my-3">
            <CButton color="primary" onClick={handleDownload}>
              <i className="bi bi-download me-2"></i>Download Receipt
            </CButton>
          </CCol>
        </CRow>
      )}
    </CContainer>
  )
}

export default OrderConfirmationPage
