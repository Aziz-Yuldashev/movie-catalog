import { fetchMovieDetails } from '@/utils/services/movie-details.service'
import type { MovieDetailTypes } from '@/utils/types/movie.types'

export const fetchTopMovies = async (): Promise<MovieDetailTypes[]> => {
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
        topMovieIDs.map(async (id) => {
            try {
                return await fetchMovieDetails(id)
            } catch (e) {
                console.error(`Failed to fetch movie with ID ${id}`, e)
                return null
            }
        }),
    )

    return movies.filter(Boolean) as MovieDetailTypes[]
}
