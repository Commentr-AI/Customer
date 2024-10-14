import { apiSlice } from './apiSlice'

export const billingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillings: builder.query({
      query: (data) => '/api/v1/orders/getAllOrders',
    }),
  }),
})

export const { useGetBillingsQuery } = billingApiSlice
