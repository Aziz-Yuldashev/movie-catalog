import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    VStack,
    Box,
} from '@chakra-ui/react'
import MovieCard from '@/components/movie-card'
import { useFavorites } from '@/utils/providers/favorites-context'

type Props = {
    isOpen: boolean
    onClose: () => void
}

const FavoritesModal = ({ isOpen, onClose }: Props) => {
    const { favorites } = useFavorites()

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Favorites</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    maxH="80vh"
                    overflowY="auto"
                    px={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {favorites.length === 0 ? (
                        <Text textAlign="center" color="gray.500" py={10}>
                            No favorites yet.
                        </Text>
                    ) : (
                        <VStack spacing={4}>
                            {favorites.map((item) => (
                                <Box key={item.imdbID} w="100%">
                                    <MovieCard movie={item} />
                                </Box>
                            ))}
                        </VStack>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default FavoritesModal
