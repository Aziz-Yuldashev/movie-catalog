import { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useDebounce } from '@/hooks/use-debounce'
import type { InputProps } from '@chakra-ui/react'

type Props = {
    onDebouncedChange: (value: string) => void
} & InputProps

const SearchInput = ({ onDebouncedChange, ...rest }: Props) => {
    const [input, setInput] = useState('')
    const debounced = useDebounce(input, 400)

    useEffect(() => {
        const normalized = debounced.trim().toLowerCase()
        onDebouncedChange(normalized)
    }, [debounced, onDebouncedChange])

    return (
        <Input
            placeholder="Search movies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            bg="white"
            color="black"
            _placeholder={{ color: 'black' }}
            {...rest}
        />
    )
}

export default SearchInput
