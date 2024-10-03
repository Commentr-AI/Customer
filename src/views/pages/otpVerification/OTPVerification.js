
import React ,{useState,useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./OTPVerification.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useOtpverificationMutation, useResendotpMutation } from '../../../app/service/usersApiSlice';
// import { setCredentials } from '../../../app/features/auth/authSlice';
import { useParams } from 'react-router-dom';

const OTPVerification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [otpverification, { isLoading }] = useOtpverificationMutation();
    const [resendotp, { isLoading: isResendOTPLoading }] = useResendotpMutation();

    const [otp,setOtp] =useState('')
    //const [email,setEmail]=useState('')
    const { email } = useParams();
    // console.log(email)

    const location = useLocation();
    
    // const  getemail = location.state || "";
    // const [email,setEmail]=useState(getemail)

    const { userInfo } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/dashboard');
  //   }
  // }, [userInfo, navigate]);


    const handleSubmit =async (e)=>{
        e.preventDefault();

        try {
            const res = await otpverification({ email, otp}).unwrap();
            toast.success(res.message);
            navigate('/login');
        } catch (error) {
            toast.error("Invalid OTP")
        }
       
    }

    const handleResend = async()=>{
      setOtp('')
      console.log(email)
      try {
        const res = await resendotp({email}).unwrap();
        toast.success(res.message)
        // toast.success(res.message);
        console.log(res)
    } catch (error) {
        // toast.error(error)
        console.error("Error sending OTP:", error); // Log the error for debugging
        toast.error(error?.data?.message || "An error occurred");
    }
    }

  return (
    <div className='main'>
        <h1 className='p-5'>Commentr</h1>
        <div className='OTP-window shadow'>
            <form onSubmit={handleSubmit}>
            <h3 className='mb-3'>Email Verification</h3>
            <h5 className='mb-4'>{email ? email:"Email Not Found"}</h5>
            <p>Please enter the 6-digit code sent to your email address to complete your registration.</p>
            <input type='number' name='OTP' className='form-control mb-4'value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP'/>
            
            <button  type="submit" className='btn btn-primary mb-4 px-3'>Verify</button>
            
            </form>
            <div  className='text-primary text-decoration-underline focus-ring' onClick={handleResend}><Link>Resend OTP</Link></div>
            
        </div>
    </div>
  )
}

export default OTPVerification