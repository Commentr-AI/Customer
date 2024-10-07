import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CRow,
  CSpinner,
  CFormSelect,
  CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilLockLocked, cilPhone } from '@coreui/icons'
import { toast } from 'react-toastify'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../../../app/service/usersApiSlice'
import { setCredentials } from '../../../app/features/auth/authSlice'
import RedditIcon from '../login/Reddit-Icon'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('Srinu')
  const [email, setEmail] = useState('vemulasrinu104@gmail.com')
  const [password, setPassword] = useState('Srinu53@')
  const [repeatPassword, setRepeatPassword] = useState('Srinu53@')
  const [priceData, setPriceData] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  // Function to parse query parameters
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const billingType = queryParams.get('billingType') // Replace 'param' with your query parameter name

  console.log(id)
  console.log(billingType)

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (id) {
      const fetchPricing = async () => {
        try {
          const res = await axios.get(`https://api-c8tq.onrender.com/api/v1/pricings/${id}`)
          //  console.log(res)

          setPriceData(res.data.pricing)

          console.log(priceData)
        } catch (e) {
          console.log(e)
        }
      }

      fetchPricing()
    }
  }, [id])

  useEffect(() => {
    console.log(priceData)
  }, [priceData])

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [userInfo, navigate])

  const redditHandler = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/reddit`
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== repeatPassword) {
      return toast.error('Password and Confirm password are not the same.')
    }

    try {
      const res = await register({
        username: name,
        email,
        password,
        role: 'user',
        plan: priceData._id,
        billingType,
      }).unwrap()
      console.log(res)

      toast.success(res)
      navigate(`/otpverification/${email}`)
    } catch (err) {
      toast.error(err?.data?.message || 'err.error')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-around gap-5 my-5 ">
          {priceData && (
            <CCol md={9} lg={4} xl={4} className="">
              <CCard className="bg-white h-100 mx-4">
                <CCardHeader className="fs-5 fw-bold p-3">Your Choosed Pricing</CCardHeader>
                <CCardBody>
                  <div className="">
                    <div className="">
                      <h4 className="mb-3 fs-2 fw-bold text-primary">{priceData.title}</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <h3 className="price mb-2 display-5 font-weight-bold text-dark fw-bold">
                          $
                          {billingType === 'billed monthly'
                            ? priceData.monthlyPrice
                            : priceData.annualPrice}
                          <span className="time fs-4 font-weight-normal text-dark">/month</span>
                        </h3>
                      </div>
                      <p className="mb-4 text-base text-muted">{billingType}</p>
                      <div className="mb-4 border-5 rounded border-bottom border-primary  "></div>
                      <div>
                        <div className="my-3">
                          <i className="bi bi-check-circle me-2 text-primary fw-bold"></i>
                          {priceData.replies} Replies
                        </div>
                        <div className="my-3">
                          <i className="bi bi-check-circle me-2 text-primary fw-bold"></i>
                          {priceData.communities} Community
                        </div>
                        <div className="my-3">
                          <i className="bi bi-check-circle me-2 text-primary fw-bold"></i>
                          {priceData.users} User account
                        </div>
                        <div className="my-3">
                          <i className="bi bi-check-circle me-2 text-primary fw-bold"></i>
                          {priceData.keywords} Keywords
                        </div>
                      </div>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          )}
          <CCol md={9} lg={7} xl={6} className=''>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <h1>Register</h1>
                {/* <div>
                  <button
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center "
                    onClick={redditHandler}
                  >
                    <RedditIcon />
                    <span className="ms-3"> SignUp with Reddit </span>
                  </button>
                </div>
                <hr className="my-4" /> */}
                <p className="text-body-secondary">Create your admin account</p>
                <CForm onSubmit={submitHandler}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      minLength={8}
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CFormCheck
                    required
                    className="mb-4"
                    label="I agree with Privacy Policy and Terms of use"
                  />
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="w-50">
                      <CButton
                        color="success"
                        type="submit"
                        className="px-4 w-100  "
                        disabled={isLoading}
                        style={{ boxShadow: 'none' }}
                      >
                        {isLoading ? <CSpinner size="sm" /> : 'Sign Up'}
                      </CButton>
                    </div>
                    <div className="w-50 ">
                      <CButton
                        color="danger"
                        className="px-4 w-100  "
                        onClick={() => {
                          setEmail('')
                          setPassword('')
                        }}
                      >
                        Cancel
                      </CButton>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span>Already have an account? </span>
                    <a href="/login" className="text-decoration-none">
                      Sign in
                    </a>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
