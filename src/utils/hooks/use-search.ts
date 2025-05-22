import { useDebounce } from './use-debounce'

export const useSearch = (search: string, delay = 500) => {
    const debounced = useDebounce(search, delay)
    return debounced.trim().toLowerCase()
}
