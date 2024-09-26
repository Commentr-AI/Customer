import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilCalendar, cilNotes, cilLayers, cilTask, cilFile } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Pricing',
    to: '/pricing',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Blogs',
    to: '/blog',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
]

export default _nav
