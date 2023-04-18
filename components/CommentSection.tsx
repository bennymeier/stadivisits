import { Box, Flex, Heading, Avatar, Text } from '@chakra-ui/react';
import CommentForm from './CommentForm';

export default function CommentSection({ comments, users }) {
  return (
    <Box>
      <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
        Comments
      </Heading>
      <CommentForm users={users} />
      <Box
        maxHeight="300px"
        overflowY="scroll"
        overflowX="hidden"
        mt="3"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '24px',
          },
        }}
      >
        {comments.map((comment) => (
          <Box
            key={comment._id}
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            p="2"
            mt="3"
            mr="3"
            _first={{ marginTop: 'unset' }}
          >
            <Flex alignItems="center" gap="12px" flexWrap="wrap">
              <Avatar
                size="xs"
                name={`${comment.author.firstname} ${comment.author.lastname}`}
                src={comment.author.avatar}
              />{' '}
              <Heading fontSize="md">
                {comment.author.firstname} {comment.author.lastname}
              </Heading>
              <Text color="gray.400" fontSize="2xs">
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </Flex>
            <Box ml="9">{comment.text}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
