import { Box, Image, Text, VStack, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { StarIcon, InfoIcon } from '@chakra-ui/icons'
import { useFavorites } from '@/utils/providers/favorites-context'
import type { MovieTypes } from '@/utils/types/movie.types'
import { fetchMovieDetails } from '@/utils/services/movie-details.service'
import useSWR from 'swr'

type Props = {
    movie: MovieTypes
}

const MovieCard = ({ movie }: Props) => {
    const [img, setImg] = useState(movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png')
    const [showInfo, setShowInfo] = useState(false)

    const { isFavorite, toggleFavorite } = useFavorites()

    const { data: details } = useSWR(showInfo ? movie.imdbID : null, fetchMovieDetails)
    console.log('details-', details)
    return (
        <Box position="relative" borderWidth="1px" borderRadius="md" overflow="hidden" p={4}>
            <IconButton
                icon={<InfoIcon />}
                aria-label="Show details"
                variant="ghost"
                size="xs"
                onClick={() => setShowInfo((prev) => !prev)}
                color="white"
                position="absolute"
                top={5}
                left={5}
                bg="blue.600"
                _hover={{ bg: 'blue.500' }}
                _active={{ bg: 'blue.500' }}
                zIndex={2}
            />
            <IconButton
                icon={<StarIcon />}
                aria-label="Toggle favorite"
                colorScheme="yellow"
                variant="ghost"
                onClick={() => toggleFavorite(movie)}
                color={isFavorite(movie) ? 'yellow.400' : 'black'}
                position="absolute"
                top={5}
                right={5}
                size="md"
                bg="#537cb4"
                _hover={{ bg: '#537cb4' }}
                _active={{ bg: '#537cb4' }}
                zIndex={1}
            />
            <Image
                src={img}
                alt={movie.Title}
                mb={3}
                borderRadius="md"
                onError={() => setImg('/placeholder.png')}
                w={{ base: '100%', md: '300px' }}
            />

            {showInfo && details && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    bg="rgba(102, 51, 153, 0.6)"
                    backdropFilter="blur(8px)"
                    color="white"
                    p={4}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    <Text fontSize="sm" mb={2}>
                        {details.Plot.length > 400
                            ? details.Plot.slice(0, 400) + '...'
                            : details.Plot}
                    </Text>
                    <Text fontWeight="bold">{details.imdbRating}/10</Text>
                </Box>
            )}
            <VStack spacing={1} align="start">
                <Text fontWeight="bold">Title: {movie.Title}</Text>
                <Text>imdbID: {movie.imdbID}</Text>
                <Text>Year: {movie.Year}</Text>
                <Text>Type: {movie.Type}</Text>
            </VStack>
        </Box>
    )
}

export default MovieCard
