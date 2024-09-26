import React from 'react'
import { useGetBlogQuery } from '../../app/service/blogSlice'
import { useParams } from 'react-router-dom'
import './ViewBlog.css' // Importing the external CSS file

const ViewBlog = () => {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    error,
  } = useGetBlogQuery(id, {
    refetchOnMountOrArgChange: true,
  })

  console.log(response)

  if (isLoading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>Error loading blog</div>
  }

  const blog = response.blog

  return (
    <div className="blog-container">
      <div className="blog-title">
        <label>Title:</label>
        <span>{blog.title}</span>
      </div>
      <div className="blog-image">
        <label>Image:</label>
        {blog.image ? (
          <img src={blog.image.url} alt="Blog" width="400" height="400" />
        ) : (
          <p>Image not uploaded</p>
        )}
      </div>
      <div className="blog-description">
        <label>Description:</label>
        <div dangerouslySetInnerHTML={{ __html: blog.description }} />
      </div>
    </div>
  )
}

export default ViewBlog
