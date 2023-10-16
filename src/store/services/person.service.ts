import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPerson, IPersonRequest } from '../models/IPerson';

export const personAPI = createApi({
    reducerPath: 'personAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://real-teal-puffer-hem.cyclic.app/',
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