import { Box, Flex, Heading, Avatar, Text } from '@chakra-ui/react';
import CommentForm from './CommentForm';

export default function CommentSection({ comments, users }) {
  return (
    <Box>
      <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
        Comments
      </Heading>
      <CommentForm users={users} />
      {comments.map((comment) => (
        <Box
          key={comment._id}
          border="1px"
          borderColor="gray.300"
          borderRadius="md"
          p="2"
          mt="3"
        >
          <Flex alignItems="center" gap="12px">
            <Avatar
              size="xs"
              name={comment.author.username}
              src={comment.author.avatar}
            />{' '}
            <Heading fontSize="md">{comment.author.username}</Heading>
            <Text color="gray.400" fontSize="2xs">
              {new Date(comment.createdAt).toLocaleString()}
            </Text>
          </Flex>
          <Box ml="9">{comment.text}</Box>
        </Box>
      ))}
    </Box>
  );
}
