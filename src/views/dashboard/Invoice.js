import React, { useRef } from 'react'
import './Invoice.css' // Custom styles for additional design if needed
import html2pdf from 'html2pdf.js'
import { Link } from 'react-router-dom'

const invoiceData = {
  customerName: 'John Doe',
  customerEmail: 'johndoe@example.com',
  invoiceNumber: 'INV-00123',
  date: 'October 5, 2024',
  items: [
    { name: 'Premium Plan', quantity: 1, price: 50 },
    { name: 'Additional Storage', quantity: 2, price: 10 },
  ],
  subtotal: 70,
  tax: 7,
  total: 77,
}

const Invoice = () => {
  const invoiceRef = useRef() // Create a ref to reference the invoice DOM element

  const handleDownload = () => {
    const invoice = invoiceRef.current // Access the current DOM node
    const opt = {
      margin: 1,
      filename: `invoice_${invoiceData.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }
    html2pdf().from(invoice).set(opt).save() // Download the PDF
  }

  return (
    <div className="container mt-5">
      {/* Reference the invoice div using the invoiceRef */}
      <div className="card invoice-card shadow p-4 " ref={invoiceRef}>
        <div className="invoice-header text-center mb-4">
          <h1 className="text-primary">Invoice</h1>
          <h5 className="text-muted">Payment Successful</h5>
        </div>
        <div className="invoice-body">
          <div className="row mb-4">
            <div className="col-sm">
              <h6>Bill To:</h6>
              <p>{invoiceData.customerName}</p>
              <p>{invoiceData.customerEmail}</p>
            </div>
            <div className="col-sm text-right">
              <h6>Invoice #: {invoiceData.invoiceNumber}</h6>
              <p>Date: {invoiceData.date}</p>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-sm text-right">
              <h6>Subtotal: ${invoiceData.subtotal}</h6>
              <h6>Tax: ${invoiceData.tax}</h6>
              <h5 className="text-primary">Total: ${invoiceData.total}</h5>
            </div>
          </div>
        </div>
        <div className="invoice-footer text-center mt-4">
          <p className="text-muted">Thank you for your payment!</p>
        </div>
      </div>
      <div className=" my-3 d-flex align-items-center justify-content-around">
        <button onClick={handleDownload} className="btn btn-success">
          Download Invoice
        </button>

      </div>
    </div>
  )
}

export default Invoice
