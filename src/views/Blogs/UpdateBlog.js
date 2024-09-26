import React, { useState, useEffect } from 'react'
import { useGetBlogQuery, useUpdateBlogMutation } from '../../app/service/blogSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './UpdateBlog.css'

const UpdateBlog = () => {
  const { id } = useParams()
  const { data: response, isLoading, error, refetch } = useGetBlogQuery(id)

  const [updateBlog, { isLoading: isUpdating, error: updateError }] = useUpdateBlogMutation()

  const [blogData, setBlogData] = useState({
    title: '',
    image: null,
    description: '',
  })
  const [previewImage, setPreviewImage] = useState('')
  const navigate = useNavigate()

  console.log(response)

  // useEffect(() => {
  //   refetch()
  //   if (response) {
  //     console.log(response.blog.title)
  //     setBlogData({
  //       title: response.blog.title,
  //       image: response.blog.image ? response.blog.image.url : null,
  //       description: response.blog.description,
  //     })

  //     setPreviewImage(response.blog.image ? response.blog.image.url : '')
  //   }
  //   console.log(blogData)
  // }, [response])

  useEffect(() => {
    if (response && !isLoading) {
      console.log(response.blog)
      setBlogData({
        title: response.blog.title || '',
        image: response.blog.image?.url || null,
        description: response.blog.description || '',
      })
    }
  }, [response, isLoading])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBlogData({
      ...blogData,
      [name]: value,
    })
  }

  const handleDescriptionChange = (value) => {
    setBlogData({
      ...blogData,
      description: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setBlogData({
      ...blogData,
      image: file,
    })
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('title', blogData.title)
    if (blogData.image) {
      formData.append('file', blogData.image)
    }
    formData.append('description', blogData.description)
    console.log(formData)

    try {
      const update = await updateBlog({ id, formData }).unwrap()
      console.log(update)

      navigate('/blog')
    } catch (error) {
      console.error('Failed to update the blog:', error)
    }
  }

  if (isLoading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>Error loading blog</div>
  }

  console.log(blogData)

  return (
    <div className={`editable-blog-container ${isUpdating ? 'loading' : ''}`}>
      <div className="editable-blog-field">
        <label>Title:</label>
        <input type="text" name="title" value={blogData.title} onChange={handleInputChange} />
      </div>
      <div className="editable-blog-field">
        <label>Image:</label>
        {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
        <input type="file" name="image" onChange={handleImageChange} />
      </div>
      <div className="editable-blog-field">
        <label>Description:</label>
        <ReactQuill value={blogData.description} onChange={handleDescriptionChange} />
      </div>
      <div className="editable-blog-actions">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default UpdateBlog
