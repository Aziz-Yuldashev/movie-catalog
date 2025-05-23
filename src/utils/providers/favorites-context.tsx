import { createContext, useContext, useEffect, useState } from 'react'
import type { MovieTypes } from '@/utils/types/movie.types'
import { useMemo } from 'react'

type FavoritesContextType = {
    favorites: MovieTypes[]
    toggleFavorite: (movie: MovieTypes) => void
    isFavorite: (movie: MovieTypes) => boolean
    count: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const FAVORITES_KEY = 'favorites'

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<MovieTypes[]>([])

    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_KEY)
        if (stored) {
            try {
                setFavorites(JSON.parse(stored))
            } catch {
                setFavorites([])
            }
        }
    }, [])

    const updateStorage = (items: MovieTypes[]) => {
        setFavorites(items)
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
    }

    const isFavorite = (movie: MovieTypes) => favorites.some((item) => item.imdbID === movie.imdbID)

    const toggleFavorite = (movie: MovieTypes) => {
        const exists = isFavorite(movie)
        const updated = exists
            ? favorites.filter((item) => item.imdbID !== movie.imdbID)
            : [...favorites, movie]

        updateStorage(updated)
    }

    const value = useMemo(
        () => ({
            favorites,
            toggleFavorite,
            isFavorite,
            count: favorites.length,
        }),
        [favorites],
    )

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
