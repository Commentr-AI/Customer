import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { useForgotMutation } from '../../../app/service/usersApiSlice';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [forgotPassword, { isLoading, isSuccess, isError, error }] = useForgotMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting email:', email) // Log the email being submitted
    try {
      const response = await forgotPassword({ email }).unwrap()
      console.log('API response:', response) // Log the API response
      if(response.status=='success'){
        toast.success("Email sent successfully!")
      }
    } catch (err) {
      console.error('Failed to send password reset email: ', err)
      toast.error("Failed to send password reset email");
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <div className="mx-4 rounded shadow">
              <div className="p-4  ">
                <CForm onSubmit={handleSubmit}>
                  <h1>Forgot Password</h1>
                  <p className="text-body-secondary">
                    Enter your email, we will send you the password
                  </p>
                  {/* {isSuccess && <p className="text-success">Email sent successfully!</p>} */}
                  {isError && <p className="text-danger">{error.data.message}</p>}
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="email">Email address</CFormLabel>
                      <CFormInput
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton type="submit" color="primary" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Generate Password'}
                    </CButton>
                    <span style={{ marginTop: '10px' }}>
                      If you know your password? Continue to <Link className='text-decoration-none' to={'/login'}>Sign in</Link>
                    </span>
                  </div>
                </CForm>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
