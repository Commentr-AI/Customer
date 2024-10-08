// import { apiSlice } from './apiSlice'

// export const PriceApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getPrices: builder.query({
//       query: (data) => '/api/v1/pricings/getAllPricings',
//     }),

//     addPrice: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/pricings/createPricing',
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     deletePrice: builder.mutation({
//       query: (id) => ({
//         url: `/api/v1/pricings/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//     getPrice: builder.query({
//       query: (id) => ({
//         url: `/api/v1/pricings/${id}`,
//       }),
//     }),
//     updatePrice: builder.mutation({
//       query: ({ id, pricingDetails }) => ({
//         url: `/api/v1/pricings/${id}`,
//         method: 'PATCH',
//         body: pricingDetails,
//       }),
//     }),
//   }),
// })

// export const {
//   useGetPricesQuery,
//   useAddPriceMutation,
//   useDeletePriceMutation,
//   useGetPriceQuery,
//   useUpdatePriceMutation,
// } = PriceApiSlice
