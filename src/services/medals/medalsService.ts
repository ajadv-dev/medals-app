import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {CountryMedals} from "@/services/medals/types";
import {medalsApiUrl} from "@/api/consts";

export const medalsService = createApi({
    reducerPath: 'medalsService',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getMedals: builder.query<CountryMedals[], void>({
            query: () => medalsApiUrl,
        }),
    }),
});


export const { useGetMedalsQuery } = medalsService;
