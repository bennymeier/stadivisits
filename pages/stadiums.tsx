import { Box, Heading } from '@chakra-ui/react';
import dbConnect from '../lib/dbConnect';
import Stadium from '../models/Stadium';

export default function Stadiums({ stadiums }) {
  return (
    <Box>
      <Heading>All Stadiums</Heading>
      {stadiums.map((stadium) => {
        return <Box>{stadium.name}</Box>;
      })}
    </Box>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await Stadium.find({});
  const stadiums = result.map((doc) => {
    const stadium = doc.toObject();
    stadium._id = stadium._id.toString();
    return stadium;
  });

  return { props: { stadiums: stadiums } };
}
