import axios from 'axios'
import type { MovieAPITypes } from '@/utils/types/movie.types'

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

export const fetchMovies = async (search: string, page = 1): Promise<MovieAPITypes> => {
    const response = await axios.get(BASE_URL, {
        params: {
            apikey: API_KEY,
            s: search,
            page,
        },
    })

    return response.data
}
