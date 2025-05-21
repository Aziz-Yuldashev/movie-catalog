import type { AppProps } from 'next/app'
import { FavoritesProvider } from '@/utils/providers/favorites-context'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '@/theme'

function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <FavoritesProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Component {...pageProps} />
            </FavoritesProvider>
        </ChakraProvider>
    )
}

export default App
