import axios from 'axios'
import type { MovieDetailTypes } from '@/utils/types/movie.types'
import { API_KEY, BASE_URL } from '@/configs'

export const fetchMovieDetails = async (imdbID: string): Promise<MovieDetailTypes> => {
    const response = await axios.get(BASE_URL, {
        params: {
            apikey: API_KEY,
            i: imdbID,
            plot: 'full',
        },
    })
    return response.data
}
