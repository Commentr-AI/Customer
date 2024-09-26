import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import './Blog.css' // Import external CSS for styling
import { useNavigate } from 'react-router-dom'
import { useGetBlogsQuery, useDeleteBlogMutation } from '../../app/service/blogSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

//import { useGetProjectsQuery } from '../../app/service/projectSlice'

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const {
    data: response,
    error,
    isLoading,
    refetch,
  } = useGetBlogsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const [deleteBlog, { isLoading: deleteLoading, error: deleteError }] = useDeleteBlogMutation()

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (error) {
    return <h2>error</h2>
  }

  const blogs = response.blogs

  console.log(blogs)

  //console.log(projects)

  const itemsPerPage = 5

  const convertToIST = (isoString) => {
    const date = new Date(isoString)

    const options = { timeZone: 'Asia/Kolkata' }
    const indianDate = new Date(date.toLocaleString('en-US', options))

    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }
    const time = date.toLocaleTimeString('en-IN', timeOptions)
    const day = indianDate.getDate()
    const month = indianDate.toLocaleString('en-IN', { month: 'long', timeZone: 'Asia/Kolkata' })
    const year = indianDate.getFullYear() + ''

    return `${day}-${month.slice(0, 3)}-${year.slice(-2)} ${time}`
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  // Filter projects based on the active tab
  //const filteredBlogs = projects.filter((project) => project.status === activeTab)
  const filteredBlogs = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteBlog(id).unwrap()
          console.log(result)
          Swal.fire('Deleted!', 'Your blog has been deleted.', 'success')
          refetch()
        } catch (error) {
          Swal.fire('Error!', 'There was an issue deleting the blog.', 'error')
        }
      }
    })
  }

  return (
    <CCard>
      <CCardHeader>
        <div className="header-container">
          <h3>Blogs</h3>
          <CButton
            color="primary"
            className="add-project-btn"
            onClick={() => navigate('/blog/addnew')}
          >
            Add Article
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Created On</CTableHeaderCell>
              <CTableHeaderCell>Thumbnail</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentBlogs.map((blog, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{blog.blogId}</CTableDataCell>

                <CTableDataCell>{convertToIST(blog.createdAt)}</CTableDataCell>
                <CTableDataCell>
                  {blog.image ? (
                    <img src={blog.image.url} height="50" width="50" />
                  ) : (
                    <p>not uploaded</p>
                  )}
                </CTableDataCell>

                <CTableDataCell>{blog.title}</CTableDataCell>

                <CTableDataCell>
                  <CButton
                    color="info"
                    className="action-btn"
                    onClick={() => navigate(`/blog/${encodeURIComponent(blog.title)}`)}
                  >
                    View
                  </CButton>
                  <CButton
                    color="warning"
                    className="action-btn"
                    onClick={() => navigate(`/blog/update/${encodeURIComponent(blog.title)}`)}
                  >
                    Edit
                  </CButton>
                  <CButton
                    color="danger"
                    className="action-btn"
                    onClick={() => handleDelete(blog.blogId)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
      <CPagination aria-label="Page navigation example">
        <CPaginationItem
          aria-label="Previous"
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <CPaginationItem
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          aria-label="Next"
          onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </CCard>
  )
}

export default Blog
