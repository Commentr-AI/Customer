import React from 'react'
import Profile from './views/profile/Profile'
import ChangePassword from './views/profile/ChangePassword'
import { element } from 'prop-types'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Blog = React.lazy(() => import('./views/Blogs/Blog.js'))
const AddBlog = React.lazy(() => import('./views/Blogs/AddBlog.js'))
const ViewBlog = React.lazy(() => import('./views/Blogs/ViewBlog.js'))
const UpdateBlog = React.lazy(() => import('./views/Blogs/UpdateBlog.js'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/change-password', name: 'Change Password', element: ChangePassword },

  { path: '/blog', name: 'Blog', element: Blog },
  { path: '/blog/addnew', name: 'Add Blog', element: AddBlog },
  { path: '/blog/:id', name: 'View blog', element: ViewBlog },
  { path: '/blog/update/:id', name: 'Update blog', element: UpdateBlog },
]

export default routes
