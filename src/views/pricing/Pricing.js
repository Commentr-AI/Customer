// src/views/pricing/Pricing.js

import React, { useState } from 'react';
import './Pricing.css'; // Import the CSS file
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CSpinner,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import {useGetPricesQuery, useDeletePriceMutation } from '../../app/service/PriceApiSlice';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Pricing = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const {
    data: res,
    error,
    isLoading,
    refetch,
  } = useGetPricesQuery(undefined, {
    refetchOnMountOrArgChange: true, // Ensures refetch on mount
  })

  const [deletePrice, { isLoading: deleteLoading, error: deleteError }] = useDeletePriceMutation()

  if (isLoading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }
  if (error) {
    return <div>error</div>
  }
  // console.log(res)
  const priceData = [...res.pricings].sort((a, b) => new Date(b.date) - new Date(a.date))

  const convertToIST = (isoString) => {
    const date = new Date(isoString)

    const options = { timeZone: 'Asia/Kolkata' }
    const indianDate = new Date(date.toLocaleString('en-US', options))

    // Extract the individual components

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

  const handleDelete = (id) => {
    console.log(id)
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
          const result = await deletePrice(id).unwrap()
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
    <div className="pricing-container">
      <h1 className="pricing-title">Pricing</h1>
      <CButton color="primary" onClick={() => navigate(`/pricing/addnew`)}>Add Price</CButton>
      <CTable striped hover className="bordered-table mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            {/* <CTableHeaderCell>Added On</CTableHeaderCell> */}
            <CTableHeaderCell>PackageName</CTableHeaderCell>
            <CTableHeaderCell>Monthly Price</CTableHeaderCell>
            <CTableHeaderCell>Annual Price</CTableHeaderCell>
            <CTableHeaderCell>Replies</CTableHeaderCell>
            <CTableHeaderCell>users</CTableHeaderCell>
            <CTableHeaderCell>communities</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {priceData.length > 0 ? (
            priceData.map((Price) => (
              <CTableRow key={Price._id}>
                <CTableDataCell>{Price.pricingId}</CTableDataCell>
                {/* <CTableDataCell>{convertToIST(Price.date)}</CTableDataCell> */}
                {/* <CTableDataCell>date</CTableDataCell> */}
                <CTableDataCell>{Price.title}</CTableDataCell>
                <CTableDataCell>{Price.monthlyPrice}</CTableDataCell>
                <CTableDataCell>{Price.annualPrice}</CTableDataCell>
                <CTableDataCell>{Price.replies}</CTableDataCell>
                <CTableDataCell>{Price.users}</CTableDataCell>
                <CTableDataCell>{Price.communities}</CTableDataCell>

                <CTableDataCell>
                  <CButton
                    color="warning"
                    className="me-2"
                    onClick={() => navigate(`/pricing/update/${Price.pricingId}`)}
                  >
                    Edit
                  </CButton>
                  <CButton color="danger" onClick={() => handleDelete(Price.pricingId)}>
                    Delete
                  </CButton>
                </CTableDataCell>
                
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="5" className="text-center">
                No Prices found
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

    </div>
  )
}

export default Pricing
