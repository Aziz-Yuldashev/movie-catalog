import { useState } from 'react'
import { Box, Image, Text, VStack } from '@chakra-ui/react'
import type { MovieTypes } from '@/utils/types/movie.types'

type Props = {
    movie: MovieTypes
}

const MovieCard = ({ movie }: Props) => {
    const [img, setImg] = useState(movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png')
    return (
        <Box borderWidth="1px" borderRadius="md" overflow="hidden" p={4}>
            <Image
                src={img}
                alt={movie.Title}
                mb={3}
                borderRadius="md"
                onError={() => setImg('/placeholder.png')}
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
