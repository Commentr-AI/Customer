import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilBuilding,cilCloudUpload, cilNotes, cilLayers,cibOpsgenie, cilTask, cilFile, cilLibrary } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   // text: 'NEW',
    // },
  },
  {
    component: CNavItem,
    name: 'Company Name',
    to: '/companyname',
    icon:<CIcon icon={cilBuilding} customClassName="nav-icon" /> ,
  },
  {
    component: CNavItem,
    name: 'Upload',
    to: '/upload',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Keywords',
    to: '/keywords',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Posts & Replies',
    to: '/postsandreplies',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cibOpsgenie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Plan',
    to: '/plan',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Billing',
    to: '/billing',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },

]

export default _nav
