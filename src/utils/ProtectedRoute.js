import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../app/features/auth/authSlice'

const ProtectedRoute = () => {
  const { isAuthenticated } = true //useSelector((state) => state.auth)
  // const [loading, setLoading] = useState(true)
  // console.log(isAuthenticated)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include',
  //       })
  //       const data = await res.json()
  //       console.log(data)
  //       if (data.status === 'success') {
  //         console.log('authenticated')
  //         dispatch(setCredentials(data.user))
  //       }
  //       setLoading(false)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }

  //   fetchData()
  // }, [dispatch])
  // if (loading) {
  //   return <h1>Loading</h1>
  // }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoute
