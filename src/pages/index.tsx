import { useState } from 'react'
import type { GetServerSideProps } from 'next'
import { fetchMovies } from '@/utils/services/movies.service'
import { fetchTopMovies } from '@/utils/services/fetch-top-movies'
import type { MovieTypes, MovieAPITypes, MovieDetailTypes } from '@/utils/types/movie.types'
import { Container, Grid, Text } from '@chakra-ui/react'
import Header from '@/components/layout/header'
import MovieCard from '@/components/movie-card'
import Loader from '@/components/shared/loader'
import ErrorText from '@/components/shared/error'
import Pagination from '@/components/shared/pagination'
import useSWR from 'swr'
import Head from 'next/head'

type Props = {
    initialMovies: MovieDetailTypes[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const initialMovies = await fetchTopMovies()

    return {
        props: {
            initialMovies,
        },
    }
}

const IndexPage = ({ initialMovies }: Props) => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const { data, isLoading, error } = useSWR<MovieAPITypes>(search ? [search, page] : null, () =>
        fetchMovies(search, page),
    )

    const movies: (MovieTypes | MovieDetailTypes)[] = data?.Search ?? (!search ? initialMovies : [])

    const totalResults = data?.totalResults ?? movies.length
    const totalPages = data ? Math.ceil(Number(totalResults) / 10) : 1

    return (
        <>
            <Head>
                <title>Movie Catalog | Find Your Favorite Films</title>
                <meta
                    name="description"
                    content="Browse and search your favorite movies using the OMDb API"
                />
            </Head>

            <Container maxW="container.xl" py={8} px={3}>
                <Header search={search} setSearch={setSearch} setPage={setPage} />

                {isLoading && <Loader />}
                {error && <ErrorText message="Error loading movies" />}

                {movies.length ? (
                    <>
                        <Text mt={4} mb={2} fontSize="md" color="gray.400" textAlign="center">
                            Found {totalResults} results
                        </Text>
                        <Grid
                            mt={4}
                            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                            gap={6}
                        >
                            {movies.map((item) => (
                                <MovieCard key={item.imdbID} movie={item} />
                            ))}
                        </Grid>
                        {data && (
                            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
                        )}
                    </>
                ) : (
                    !isLoading && (
                        <Text textAlign="center" fontSize="3xl" color="gray.500" pt={20}>
                            No movies found for your search.
                        </Text>
                    )
                )}
            </Container>
        </>
    )
}

export default IndexPage
