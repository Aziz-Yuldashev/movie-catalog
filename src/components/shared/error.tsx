import { Text } from '@chakra-ui/react'

type Props = {
    message?: string
}

const ErrorText = ({ message = 'Something went wrong' }: Props) => (
    <Text color="red.500" textAlign="center" py={6}>
        {message}
    </Text>
)

export default ErrorText
