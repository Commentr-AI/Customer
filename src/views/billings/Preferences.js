import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CForm, CFormInput, CFormLabel, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

const InvoicePreferences = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    billingEmail: 'vemulasrinuiso@gmail.com',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    state: '',
    country: 'India',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your submit logic here
    console.log('Form Data Submitted:', formData);
    alert('Invoice preferences saved successfully!');
  };

  return (
    <CCard className='w-75 d-flex align-items-center justify-content-center'>
      <CCardHeader className='w-100'>
        <h5>Invoice Preferences</h5>
        <p className="text-muted">
          Changes to these preferences will apply to future invoices only. If you need a past invoice reissued, please contact hello@commentr.com.
        </p>
      </CCardHeader>
      <CCardBody className='w-100'>
        <CForm onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-3">
            <CFormLabel>Company name</CFormLabel>
            <CFormInput
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          {/* Billing Email */}
          <div className="mb-3">
            <CFormLabel>Billing email</CFormLabel>
            <CFormInput
              type="email"
              name="billingEmail"
              value={formData.billingEmail}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          {/* Address Line 1 */}
          <div className="mb-3">
            <CFormLabel>Address line 1</CFormLabel>
            <CFormInput
              type="text"
              name="address1"
              placeholder="Enter address line 1"
              value={formData.address1}
              onChange={handleInputChange}
            />
          </div>

          {/* Address Line 2 */}
          <div className="mb-3">
            <CFormLabel>Address line 2</CFormLabel>
            <CFormInput
              type="text"
              name="address2"
              placeholder="Enter address line 2"
              value={formData.address2}
              onChange={handleInputChange}
            />
          </div>

          {/* City */}
          <div className="mb-3">
            <CFormLabel>City</CFormLabel>
            <CFormInput
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          {/* Postal Code */}
          <div className="mb-3">
            <CFormLabel>Postal code</CFormLabel>
            <CFormInput
              type="text"
              name="postalCode"
              placeholder="Enter postal code"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>

          {/* State */}
          <div className="mb-3">
            <CFormLabel>State</CFormLabel>
            <CFormInput
              type="text"
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>

          {/* Country */}
          <div className="mb-3">
            <CFormLabel>Country</CFormLabel>
            <CFormInput
              type="text"
              name="country"
              value={formData.country}
              readOnly
            />
          </div>

          {/* Submit Button */}
          <CButton color="primary" type="submit">
            Save Preferences
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
   
  );
};

export default InvoicePreferences;
