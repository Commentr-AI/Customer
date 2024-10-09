import React from 'react';
import Profile from './views/profile/Profile';
import ChangePassword from './views/profile/ChangePassword';
import CheckOut from './utils/CheckOut.js';
import { element } from 'prop-types'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CompanyName =React.lazy(()=>import('./views/companyName/CompanyName.js'));
const Upload =React.lazy(()=>import('./views/upload/Upload.js'));
const PostsAndReplies =React.lazy(()=>import('./views/postsAndReplies/PostsAndReplies.js'));
const Users =React.lazy(()=>import('./views/users/Users.js'));
const Plan =React.lazy(()=>import('./views/plan/Plan.js'));
const Bilings =React.lazy(()=>import('./views/billings/Bilings.js'))
const Keywords = React.lazy(()=>import("./views/keywords/Keywords.js"))
const OrderSuccess = React.lazy(()=>import('./views/orderSuccess/OrderSuccess.js'))

// const Blog = React.lazy(() => import('./views/Blogs/Blog.js'))
// const AddBlog = React.lazy(() => import('./views/Blogs/AddBlog.js'))
// const ViewBlog = React.lazy(() => import('./views/Blogs/ViewBlog.js'))
// const UpdateBlog = React.lazy(() => import('./views/Blogs/UpdateBlog.js'))


const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/companyname', name: 'Company Name', element: CompanyName },
  { path: '/upload', name: 'Upload', element: Upload },
  { path: '/postsandreplies', name: 'Posts & Replies', element: PostsAndReplies },
  { path: '/users', name: 'Users', element: Users },
  { path: '/plan', name: 'Plan', element: Plan },
  { path: '/billing', name: 'Billing', element: Bilings},
  { path: '/keywords', name: 'Keywords', element: Keywords},
  {path :'/billing/payment',name:"Payment Details", element:OrderSuccess},

  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/change-password', name: 'Change Password', element: ChangePassword },
  { path: '/checkout' , name:"Check Out", element:CheckOut}

  // { path: '/blog', name: 'Blog', element: Blog },
  // { path: '/blog/addnew', name: 'Add Blog', element: AddBlog },
  // { path: '/blog/:id', name: 'View blog', element: ViewBlog },
  // { path: '/blog/update/:id', name: 'Update blog', element: UpdateBlog },
]

export default routes
