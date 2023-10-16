import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPerson, IPersonRequest } from '../models/IPerson';

export const personAPI = createApi({
    reducerPath: 'personAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
    }),
    endpoints: (builder) => ({
        getPersons: builder.mutation<IPerson[], IPersonRequest>({
            query: (credentials) => ({
                url: 'persons',
                method: 'POST',
                body: credentials
            }),
        }),
    }),
});

export const { useGetPersonsMutation } = personAPI;