import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseURL from '../Urls/baseURL';

export const getBlogs = createApi({
    reducerPath:"getBlogs",
    baseQuery:fetchBaseQuery({
        baseUrl:baseURL
    }),

    endpoints:(builder)=>({
        getAllBlogs:builder.query({
            query:()=>({
                url:`fetchblog`,
                method:'GET'
            })
        })
    })
})


export const {useGetAllBlogsQuery} = getBlogs;