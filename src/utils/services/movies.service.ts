import axios from 'axios'
import type { MovieAPITypes } from '@/utils/types/movie.types'
import { API_KEY, BASE_URL } from '@/configs'

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
