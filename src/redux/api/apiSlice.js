import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',  // ← this tells the browser to send cookies
});



export const apiSlice = createApi({
    reducerPath: 'api',  // optional, defaults to 'api'
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: (builder) => ({}),  // define endpoints in feature slices
});
