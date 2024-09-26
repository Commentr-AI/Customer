import React, { useState, useEffect, useRef } from 'react'
import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useCreateBlogMutation } from '../../app/service/blogSlice'
import { toast } from 'react-toastify'

import './AddBlog.css' // Import the CSS file
import { useNavigate } from 'react-router-dom'

const MyForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [keywords, setKeywords] = useState('')

  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const [createBlog, { isLoading, error }] = useCreateBlogMutation()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    //data.append('clientName', clientName)
    data.append('metaDescription', metaDescription)
    data.append('title', title)
    data.append('description', description)
    data.append('keywords', keywords)
    if (image) {
      data.append('file', image)
    }
    try {
      const response = await createBlog(data).unwrap()
      toast.success('blog added successfully')
      console.log(response)
      navigate('/blog')
    } catch (e) {
      console.log(e)
    }

    // console.log('Title:', title)
    // console.log('Description:', description)
    // console.log('Image:', image)
  }

  return (
    <CForm onSubmit={handleSubmit} className={`my-form ${isLoading ? 'loading' : ''}`}>
      <div className="form-group">
        <CFormLabel htmlFor="title" className="form-label">
          Title
        </CFormLabel>
        <div className="form-input-container">
          <CFormInput
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
      </div>
      <div className="form-group">
        <CFormLabel htmlFor="image" className="form-label">
          Upload Image
        </CFormLabel>
        <div className="form-input-container">
          <CFormInput
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>
      </div>
      <div className="form-group">
        <CFormLabel htmlFor="description" className="form-label">
          Description
        </CFormLabel>
        <div className="editor-container">
          <ReactQuill
            value={description}
            onChange={setDescription}
            modules={modules} // Optional: Configure modules as needed
            formats={formats} // Optional: Configure formats as needed
          />
        </div>
      </div>
      <div className="form-group">
        <CFormLabel htmlFor="meta-description" className="form-label">
          Meta Description
        </CFormLabel>
        <div className="form-input-container">
          <CFormInput
            type="text"
            id="meta-description"
            name="enter meta description"
            placeholder="Enter meta description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="form-input"
          />
        </div>
      </div>
      <div className="form-group">
        <CFormLabel htmlFor="keywords" className="form-label">
          Keywords
        </CFormLabel>
        <div className="form-input-container">
          <CFormInput
            type="text"
            id="keywords"
            name="keywordss"
            placeholder="Enter keywors seperated by coma"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="form-input"
          />
        </div>
      </div>
      <CButton type="submit" color="primary" className="form-button">
        Submit
      </CButton>
    </CForm>
  )
}

// Optional: Configure Quill modules and formats
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link'],
    ['clean'],
  ],
}

const formats = ['header', 'list', 'bullet', 'bold', 'italic', 'underline', 'link']

export default MyForm
