import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../app/features/auth/authSlice'

const ProtectedRoute = () => {
  const { isAuthenticated } =  useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  // console.log(isAuthenticated)
  const dispatch = useDispatch()
  // console.log('This is protectedRoute ')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        const data = await res.json()
        // console.log(data)
        if (data.status === 'success') {
          // console.log('authenticated')
          dispatch(setCredentials(data.user))
        }
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [dispatch])
  if (loading) {
    
    return(
      <div
      className="d-flex justify-content-center align-items-start "
      style={{
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: semi-transparent background
        position: 'relative',
      }}
    >
      <div className="spinner-border fs-1 spinner-border-lg text-primary " style={{width:"5rem", height:"5rem", marginTop:"15%"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    );

  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoute
