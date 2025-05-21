import {
    Box,
    Flex,
    Input,
    IconButton,
    Avatar,
    Text,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
    Badge,
    useDisclosure,
} from '@chakra-ui/react'
import { StarIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useFavorites } from '@/utils/providers/favorites-context'
import FavoritesModal from '@/components/shared/favorites-modal'

type Props = {
    search: string
    setSearch: (value: string) => void
}

const Header = ({ search, setSearch }: Props) => {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('gray.100', 'gray.800')
    const textColor = useColorModeValue('black', 'white')

    const { count } = useFavorites()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box bg={bg} px={{ base: 4, md: 6 }} py={4} color="white">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'stretch', md: 'center' }}
                    gap={4}
                    wrap="wrap"
                >
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color="purple.400"
                        cursor="pointer"
                        textAlign={{ base: 'center', md: 'left' }}
                    >
                        UPPER <span style={{ color: `${textColor}` }}>SETUP</span>
                    </Text>

                    <Input
                        placeholder="Search movies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        bg="white"
                        color="black"
                        _placeholder={{ color: 'black' }}
                        flex={{ base: 'unset', md: 1 }}
                    />

                    <Flex align="center" justify="flex-end" gap={4}>
                        <IconButton
                            aria-label="Toggle theme"
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            onClick={toggleColorMode}
                            variant="ghost"
                            fontSize="lg"
                            color={useColorModeValue('black', 'yellow.400')}
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                            _focus={{ boxShadow: 'none' }}
                            transition="all 0.3s"
                        />

                        <Box position="relative">
                            <IconButton
                                icon={<StarIcon />}
                                aria-label="Favorites"
                                variant="ghost"
                                color={textColor}
                                fontSize="lg"
                                onClick={onOpen}
                            />

                            <Badge
                                position="absolute"
                                top="-1"
                                right="-1"
                                colorScheme="purple"
                                borderRadius="full"
                                fontSize="0.7rem"
                                px={2}
                            >
                                {count}
                            </Badge>
                        </Box>

                        <Avatar size="sm" />
                        {!isMobile && <Text color={textColor}>User</Text>}
                    </Flex>
                </Flex>
            </Box>
            <FavoritesModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Header
