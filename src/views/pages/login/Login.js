// src/views/pages/login/Login.js

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useLoginMutation } from '../../../app/service/usersApiSlice'
import { setCredentials } from '../../../app/features/auth/authSlice'
import { toast } from 'react-toastify'
import './Login.css' // Import the custom CSS file
import RedditIcon from './Reddit-Icon';

const Login = () => {
  const [email, setEmail] = useState('')//neonflake
  const [password, setPassword] = useState('')//Naveen@754

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await res.json()
      console.log(data)
      if (data.status === 'success') {
        navigate('/dashboard')
      }
    }

    fetchData()
  }, [navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ username: email, password, role: 'admin' }).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
      toast.success('Login Successful! Welcome back!.')
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <CContainer className="login-container">
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard className="p-4 login-card">
                <CCardBody>
                  <CForm onSubmit={submitHandler}>
                    <h1 className="login-header">Login</h1>
                    <div>
                      <button className='btn btn-primary w-100 d-flex align-items-center justify-content-center ' ><RedditIcon/><span className='ms-3'> Login with Reddit </span></button>
                    </div>
                    <hr className='my-4'/>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3 login-input-group">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email Address"
                        type="text"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4 login-input-group">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        placeholder="Password"
                        required
                      />
                    </CInputGroup>
                    
                    <div className="d-flex align-items-center justify-content-around">
                      <div>
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? <CSpinner size="sm" /> : 'Login'}
                        </CButton>
                      </div>
                      <div>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={() => {
                            setEmail('')
                            setPassword('')
                          }}
                        >
                          Cancel
                        </CButton>
                      </div>
                    </div>
                    <CRow className="login-footer">
                      <CCol className="text-start">
                        <Link to="/forgot-password" >
                          <CButton color="link" className="px-0 text-decoration-none" >
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                    <CRow className="login-footer">
                      <CCol className="text-right">
                        Don't have an account? <Link to="/register" className='text-decoration-none'>Sign Up</Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
