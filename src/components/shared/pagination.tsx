import { Button, Flex, IconButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

type Props = {
    totalPages: number
    page: number
    setPage: (page: number) => void
}

const Pagination = ({ totalPages, page, setPage }: Props) => {
    const STORAGE_KEY = 'pagination_expanded'
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'true') {
            setExpanded(true)
        }
    }, [])

    const toggleExpanded = () => {
        const newValue = !expanded
        setExpanded(newValue)
        localStorage.setItem(STORAGE_KEY, String(newValue))
    }

    if (totalPages <= 1) return null

    const visiblePages = expanded
        ? Array.from({ length: totalPages }, (_, i) => i + 1)
        : Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1)

    return (
        <Flex mt={10} justify="center" wrap="wrap" gap={2} direction="column" align="center">
            <Flex wrap="wrap" gap={2} justify="center">
                {visiblePages.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        colorScheme={page === pageNumber ? 'purple' : 'gray'}
                        size="sm"
                    >
                        {pageNumber}
                    </Button>
                ))}

                {totalPages > 10 && (
                    <IconButton
                        aria-label={expanded ? 'Collapse pages' : 'Expand pages'}
                        icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        size="sm"
                        onClick={toggleExpanded}
                    />
                )}
            </Flex>
        </Flex>
    )
}

export default Pagination
