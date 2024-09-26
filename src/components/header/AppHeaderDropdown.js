import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../app/features/auth/authSlice'
import { useLogoutUserMutation } from '../../app/service/usersApiSlice'

import { toast } from 'react-toastify'

const linkStyle = {
  textDecoration: 'none', // Remove underline
  color: 'inherit', // Inherit text color
}

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector((state) => state.auth)

  const [logoutUser, { isLoading }] = useLogoutUserMutation()

  const logoutHandler = async () => {
    try {
      const res = await logoutUser()
      console.log('logout status', res)
      if (res.data.status == 'success') {
        dispatch(logout())

        navigate('/login')

        toast.success('Logout Sucessful!')
      }

      //console.log(userInfo)

      //navigate('/login')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          style={{
            width: '48px',
            height: '48px',
            fontSize: 'auto',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          color="success"
          textColor="white"
        >
          {'User'}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => navigate('/profile')} style={linkStyle}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem onClick={() => navigate('/profile/change-password')} style={linkStyle}>
          <CIcon icon={cilSettings} className="me-2" />
          Change Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={logoutHandler} style={{ ...linkStyle, textDecoration: 'none' }}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
