import React, { useState, useEffect, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setCredentials } from './app/features/auth/authSlice'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import ForgotPassword from './views/pages/forgot/ForgotPassword'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const OTPVerification = React.lazy(()=> import("./views/pages/otpVerification/OTPVerification"))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const App = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <ToastContainer />
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route
            exact
            path="/login"
            name="Login Page"
            element={
              // <PublicRoute>
              <Login />
              // </PublicRoute>
            }
            // element={<Login />}
          />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/otpverification" name="OTP Verification" element={<OTPVerification />} />
          <Route
            exact
            path="/forgot-password"
            name="Forgot Password Page"
            element={<ForgotPassword />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {/* <Route
            path="*"
            name="Home"
            element={<ProtectedRoute />} // Assume ProtectedRoute handles authentication
          > */}
          <Route path="*" element={<DefaultLayout />} />
          {/* </Route> */}

          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
