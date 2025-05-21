import { useState } from 'react'
import { Container, Grid } from '@chakra-ui/react'
import { fetchMovies } from '@/utils/services/movies.service'
import type { MovieTypes } from '@/utils/types/movie.types'
import Header from '@/components/layout/header'
import MovieCard from '@/components/movie-card'
import Loader from '@/components/shared/loader'
import ErrorText from '@/components/shared/error'
import useSWR from 'swr'

const IndexPage = () => {
    const [search, setSearch] = useState('')
    const { data, isLoading, error } = useSWR(search, fetchMovies)

    return (
        <Container maxW="container.xl" py={8} px={0}>
            <Header search={search} setSearch={setSearch} />

            {isLoading && <Loader />}
            {error && <ErrorText message="Error loading movies" />}

            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                {data?.map((item: MovieTypes) => (
                    <MovieCard key={item.imdbID} movie={item} />
                ))}
            </Grid>
        </Container>
    )
}

export default IndexPage
