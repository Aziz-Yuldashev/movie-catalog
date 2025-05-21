import { Box, Image, Text, VStack, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { StarIcon } from '@chakra-ui/icons'
import { useFavorites } from '@/utils/providers/favorites-context'
import type { MovieTypes } from '@/utils/types/movie.types'

type Props = {
    movie: MovieTypes
}

const MovieCard = ({ movie }: Props) => {
    const [img, setImg] = useState(movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png')

    const { isFavorite, toggleFavorite } = useFavorites()
    return (
        <Box position="relative" borderWidth="1px" borderRadius="md" overflow="hidden" p={4}>
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
            />
            <Image
                src={img}
                alt={movie.Title}
                mb={3}
                borderRadius="md"
                onError={() => setImg('/placeholder.png')}
                w={{ base: '100%', md: '300px' }}
            />
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
