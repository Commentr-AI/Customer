

// import React, { useState, useEffect } from 'react';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CFormCheck,
//   CRow,
//   CSpinner,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilUser, cilLockLocked, cilPhone } from '@coreui/icons';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRegisterMutation } from '../../../app/service/usersApiSlice';
// import { setCredentials } from '../../../app/features/auth/authSlice';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [register, { isLoading }] = useRegisterMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/dashboard');
//     }
//   }, [userInfo, navigate]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== repeatPassword) {
//       return toast.error('Password and Confirm password are not the same.');
//     }

//     try {
//       const res = await register({ name, email, password, role: 'admin', phoneNumber }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       toast.success('Sign Up Successful! Welcome to the dashboard. 🚀');
//       navigate('/dashboard');
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm onSubmit={submitHandler}>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your admin account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput
//                       placeholder="Name"
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>@</CInputGroupText>
//                     <CFormInput
//                       type="email"
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       minLength={8}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Confirm Password"
//                       minLength={8}
//                       value={repeatPassword}
//                       onChange={(e) => setRepeatPassword(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilPhone} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="text"
//                       placeholder="Phone Number (e.g., +123-4567890)"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CFormCheck
//                     required
//                     className="mb-4"
//                     label="I agree with Privacy Policy and Terms of use"
//                   />
//                   <div className="d-grid mb-3">
//                     <CButton color="success" type="submit" disabled={isLoading}>
//                       {isLoading ? <CSpinner size="sm" /> : 'Sign Up'}
//                     </CButton>
//                   </div>
//                   <div className="mt-3 text-center">
//                     <span>Already have an account? </span>
//                     <a href="/login">Sign in</a>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   );
// };

// export default Register;











import React, { useState, useEffect } from 'react';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked, cilPhone } from '@coreui/icons';
import { toast } from 'react-toastify';
import { useNavigate ,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../../app/service/usersApiSlice';
import { setCredentials } from '../../../app/features/auth/authSlice';
import RedditIcon from '../login/Reddit-Icon';

const Register = () => {
  const [name, setName] = useState('Srinu');
  const [email, setEmail] = useState('vemulasrinu104@gmail.com');
  const [password, setPassword] = useState('Srinu53@');
  const [repeatPassword, setRepeatPassword] = useState('Srinu53@');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [countryCode, setCountryCode] = useState('+1'); // Default country code

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      return toast.error('Password and Confirm password are not the same.');
    }

    try {
      const res = await register({ username: name, email, password, role: 'user',}).unwrap();
      console.log(res)
      
      toast.success(res);
      navigate(`/otpverification/${email}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center gap-1">
          {id &&
                  <CCol mb={5} lg={4} xl={4} className=''>
            <CCard className='bg-white h-100'>
              <CCardHeader>
                Choose Pricing
              </CCardHeader>
              <CCardBody>
             
              <div className="">
  <div className="">
    <h4 className="mb-3 display-6 font-weight-bold text-dark">
      packageName
    </h4>
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="price mb-2 display-4 font-weight-bold text-dark">
        $10
        <span className="time fs-4 font-weight-normal text-muted">/duration</span>
      </h3>
    </div>
    <p className="mb-7 text-base text-muted">subtitle</p>
    <div className="mb-4 border-bottom border-muted border-opacity-10 pb-4">
      <a 
        href={`https://customer-zeta-eight.vercel.app`} 
        className="btn btn-primary btn-block rounded-xl p-3 text-base font-weight-bold text-white transition duration-300 ease-in-out hover:bg-opacity-80"
      >
        Try on desktop
      </a>
    </div>
    <div>
    <div>children</div>
    <div>children</div>
    <div>children</div>
    </div>
    <div className="position-absolute bottom-0 end-0 z-n1">
      <svg
        width="179"
        height="158"
        viewBox="0 0 179 158"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
          fill="url(#paint0_linear_70:153)"
        />
        <path
          opacity="0.3"
          d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
          fill="url(#paint1_linear_70:153)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_70:153"
            x1="69.6694"
            y1="29.9033"
            x2="196.108"
            y2="83.2919"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4A6CF7" stopOpacity="0.62" />
            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_70:153"
            x1="165.348"
            y1="-75.4466"
            x2="-3.75136"
            y2="103.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4A6CF7" stopOpacity="0.62" />
            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</div>


              </CCardBody>
              
            </CCard>
          </CCol>
          }
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                
                  <h1>Register</h1>
                  <div>
                      <button className='btn btn-primary w-100 d-flex align-items-center justify-content-center ' ><RedditIcon/><span className='ms-3'> SignUp with Reddit </span></button>
                    </div>
                    <hr className='my-4'/>
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
                  <div className='d-flex align-items-center justify-content-between gap-3'>
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
                  <div className='w-50 '>
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
                    <a href="/login" className='text-decoration-none'>Sign in</a>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
