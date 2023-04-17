import {
  Avatar,
  Text,
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import dbConnect from '../lib/dbConnect';
import Comment from '../models/Comment';
import User from '../models/User';
import Stadium from '../models/Stadium';
import { Link } from '@chakra-ui/next-js';

export default function Comments({ comments }) {
  return (
    <Box>
      <Heading>All Comments</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Author</Th>
              <Th>Comment</Th>
              <Th>Stadium</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.map((comment) => (
              <Tr key={comment._id}>
                <Td>
                  <Flex alignItems="center" gap="12px">
                    <Avatar
                      size="xs"
                      name={comment.author.username}
                      src={comment.author.avatar}
                    />{' '}
                    <Text fontSize="md">{comment.author.username}</Text>
                  </Flex>
                </Td>
                <Td maxWidth="100px" overflow="hidden" textOverflow="ellipsis">
                  {comment.text}
                </Td>
                <Td>
                  <Link href={`/stadium/${comment.stadium._id}`}>
                    {comment.stadium.name}
                  </Link>
                </Td>
                <Td>{new Date(comment.createdAt).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await Comment.find({})
    .populate({ path: 'author', model: User })
    .populate({ path: 'stadium', model: Stadium })
    .lean();
  const comments = result.map((doc) => {
    const comment = doc;
    comment._id = comment._id.toString();
    comment.createdAt = comment.createdAt.toString();
    comment.updatedAt = comment.updatedAt.toString();
    comment.author._id = comment.author._id.toString();
    comment.author.createdAt = comment.author.createdAt.toString();
    comment.author.updatedAt = comment.author.updatedAt.toString();
    comment.stadium._id = comment.stadium._id.toString();
    comment.stadium.createdAt = comment.stadium.createdAt.toString();
    comment.stadium.updatedAt = comment.stadium.updatedAt.toString();
    return comment;
  });

  return { props: { comments: comments } };
}
