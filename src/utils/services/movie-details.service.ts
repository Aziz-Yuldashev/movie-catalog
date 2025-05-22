import axios from 'axios'
import type { MovieDetailTypes } from '@/utils/types/movie.types'

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

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
