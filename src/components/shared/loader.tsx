import { Center, Spinner, Text, VStack } from '@chakra-ui/react'

const Loader = () => (
    <Center py={10}>
        <VStack>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="orange.500" borderWidth="4px" />
            <Text color="orange.500">Loading...</Text>
        </VStack>
    </Center>
)

export default Loader
