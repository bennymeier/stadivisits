import { Box, Heading } from '@chakra-ui/react';
import dbConnect from '../lib/dbConnect';
import Comment from '../models/Comment';

export default function Comments({ comments }) {
  return (
    <Box>
      <Heading>All Stadiums</Heading>
      {comments.map((comment) => {
        return <Box>{comment.name}</Box>;
      })}
    </Box>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await Comment.find({});
  const comments = result.map((doc) => {
    const comment = doc.toObject();
    comment._id = comment._id.toString();
    return comment;
  });

  return { props: { comments: comments } };
}
