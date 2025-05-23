import { fetchMovieDetails } from '@/utils/services/movie-details.service'
import type { MovieDetailTypes } from '@/utils/types/movie.types'

let cache: MovieDetailTypes[] | null = null
export const fetchTopMovies = async (): Promise<MovieDetailTypes[]> => {
    if (cache) return cache
    console.log('Fetching top movies from API...')

    const topMovieIDs = [
        'tt0111161', // The Shawshank Redemption
        'tt0068646', // The Godfather
        'tt0468569', // The Dark Knight
        'tt0071562', // The Godfather Part II
        'tt0108052', // Schindler's List
        'tt0167260', // The Return of the King
        'tt0110912', // Pulp Fiction
        'tt0120737', // Fellowship of the Ring
        'tt0137523', // Fight Club
        'tt0109830', // Forrest Gump
    ]

    const movies = await Promise.all(
        topMovieIDs.map((id) => fetchMovieDetails(id).catch(() => null)),
    )
    cache = movies.filter(Boolean) as MovieDetailTypes[]

    return cache
}
