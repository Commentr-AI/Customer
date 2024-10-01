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
import { useForgotMutation } from '../../../app/service/usersApiSlice'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')

  const [forgotPassword, { isLoading, isSuccess, isError, error }] = useForgotMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("button clicked")
    // console.log('Submitting email:', email) // Log the email being submitted
    // try {
    //   const response = await forgotPassword({ email }).unwrap()
    //   console.log('API response:', response) // Log the API response
    // } catch (err) {
    //   console.error('Failed to send password reset email: ', err)
    // }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <div className="mx-4 rounded shadow">
              <div className="p-4  ">
                <h2 className='mb-3'>Reset Password</h2>
                <CForm onSubmit={handleSubmit}>
                   <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="password">New Password</CFormLabel>
                      <CFormInput
                        type="password"
                        id="password"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CCol>
                    </CRow>
                    <CRow>
                    <CCol>
                      <CFormLabel htmlFor="conformpassword">Conform Password</CFormLabel>
                      <CFormInput
                        type="conformpassword"
                        id="conformpassword"
                        placeholder=""
                        value={conformPassword}
                        onChange={(e) => setConformPassword(e.target.value)}
                        required
                      />
                    </CCol>
                  </CRow>
                  <div className="d-grid mt-5">
                    <CButton type="submit" color="primary" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Update Password'}
                    </CButton>
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

export default ResetPassword
