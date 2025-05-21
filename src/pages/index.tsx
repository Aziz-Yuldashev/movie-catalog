import { useState } from 'react'
import { useDebounce } from '@/utils/hooks/use-debounce'
import { fetchMovies } from '@/utils/services/movies.service'
import type { MovieTypes, MovieAPITypes } from '@/utils/types/movie.types'
import { Container, Grid, Text } from '@chakra-ui/react'
import Header from '@/components/layout/header'
import MovieCard from '@/components/movie-card'
import Loader from '@/components/shared/loader'
import ErrorText from '@/components/shared/error'
import Pagination from '@/components/shared/pagination'
import useSWR from 'swr'
import Head from 'next/head'

const IndexPage = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const debouncedSearch = useDebounce(search, 500)
    const { data, isLoading, error } = useSWR<MovieAPITypes>(
        debouncedSearch.trim() ? [debouncedSearch, page] : null,
        () => fetchMovies(debouncedSearch, page),
    )
    const totalPages = data?.totalResults ? Math.ceil(Number(data.totalResults) / 10) : 0

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
                <Header
                    search={search}
                    setSearch={(val) => {
                        setSearch(val)
                        setPage(1)
                    }}
                />

                {isLoading && <Loader />}
                {error && <ErrorText message="Error loading movies" />}

                {data?.Search?.length ? (
                    <>
                        <Text mt={4} mb={2} fontSize="md" color="gray.400" textAlign="center">
                            Found {data.totalResults} results
                        </Text>
                        <Grid
                            mt={4}
                            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                            gap={6}
                        >
                            {data.Search.map((item: MovieTypes) => (
                                <MovieCard key={item.imdbID} movie={item} />
                            ))}
                        </Grid>
                        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
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
