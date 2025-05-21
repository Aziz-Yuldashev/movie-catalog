import { Button, Flex } from '@chakra-ui/react'

type Props = {
    totalPages: number
    page: number
    setPage: (page: number) => void
}

const Pagination = ({ totalPages, page, setPage }: Props) => {
    if (totalPages <= 1) return null

    return (
        <Flex mt={10} justify="center" wrap="wrap" gap={2}>
            {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1
                return (
                    <Button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        colorScheme={page === pageNumber ? 'purple' : 'gray'}
                        size="sm"
                    >
                        {pageNumber}
                    </Button>
                )
            })}
        </Flex>
    )
}

export default Pagination
