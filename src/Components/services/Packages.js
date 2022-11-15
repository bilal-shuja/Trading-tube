import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Packages = createApi({
    reducerPath:"Packages",
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_BASE_URL
        
    }),
    
    endpoints:(builder)=>({
        packagePost: builder.mutation({
            query:(formdata)=>{    
                return{
                    url:`AddPackage`,
                    method:'POST',
                    body:formdata
                }
                
            }
            
        }),
        getPackage: builder.query({
            query:()=>{    
                return{
                    url:`fetchallpackage`,
                    method:'GET',
                }
            }
            
        }),
        
        
        
    })
})

export const { usePackagePostMutation, useGetPackageQuery } = Packages;