import { Box, Flex, Input, Spacer, IconButton, Avatar, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

type Props = {
    search: string
    setSearch: (value: string) => void
}

const Header = ({ search, setSearch }: Props) => {
    return (
        <Box bg="gray.800" px={6} py={4} color="white">
            <Flex align="center">
                <Text fontSize="xl" fontWeight="bold" color="purple.400" cursor="pointer">
                    UPPER<span style={{ color: 'white' }}>SETUP</span>
                </Text>

                <Input
                    mx={10}
                    maxW="100%"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    bg="white"
                    color="black"
                />

                <Spacer />

                <IconButton
                    icon={<StarIcon />}
                    aria-label="Favorites"
                    variant="ghost"
                    color="white"
                    fontSize="lg"
                />

                <Avatar ml={4} size="sm" />
                <Text ml={2}>User</Text>
            </Flex>
        </Box>
    )
}

export default Header
