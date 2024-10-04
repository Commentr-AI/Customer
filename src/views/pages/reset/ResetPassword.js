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
import { Link, useNavigate } from 'react-router-dom'
import { useResetMutation } from '../../../app/service/usersApiSlice'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
  const [password, setPassword] = useState('12345678')
  const [confirmPassword, setConfirmPassword] = useState('12345678')
  const navigate =useNavigate();

  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetMutation()

  const { token } = useParams();
  console.log("token", token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }


    try {
      console.log(token, password)
      const response = await resetPassword({password, token}).unwrap()
      console.log('API response:', response) // Log the API response
      if(response.mesee="success"){
        toast.success("password reset successful")
        navigate('/login');
      }
    } catch (err) {
      console.error('Failed to send password reset email: ', err)
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
                      <CFormLabel htmlFor="confirmpassword">Confirm Password</CFormLabel>
                      <CFormInput
                        type="confirmpassword"
                        id="confirmpassword"
                        placeholder=""
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UpdatePassword
