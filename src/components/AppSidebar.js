import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChange, toggleUnfold } from '../app/features/header/toggler'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.header.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.header.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      // colorScheme="lightblue"
      style={{backgroundColor:"rgb(224 242 254)", color:""}}
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(toggleChange(visible))
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          {/* <img src="/logo.png" alt="logo" height={32} width={165.23} /> */}
        </CSidebarBrand>
        <CCloseButton className="d-lg-none" dark onClick={() => dispatch(toggleChange(false))} />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-flex align-items-center justify-content-center">
        {/* <CSidebarToggler onClick={() => dispatch(toggleUnfold(!unfoldable))} /> */}
        <div>Replies consumed</div>
      </CSidebarFooter>
      
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
