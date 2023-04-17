import {
  Box,
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

export default function Comments({ comments }) {
  return (
    <Box>
      <Heading>All Comments</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Comment</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.map((comment) => (
              <Tr key={comment._id}>
                <Td>{comment.text}</Td>
                <Td>{comment.createdAt}</Td>
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

  const result = await Comment.find({}).populate('User');
  const comments = result.map((doc) => {
    const comment = doc.toObject();
    comment._id = comment._id.toString();
    comment.createdAt = comment.createdAt.toString();
    comment.updatedAt = comment.updatedAt.toString();
    return comment;
  });

  return { props: { comments: comments } };
}
