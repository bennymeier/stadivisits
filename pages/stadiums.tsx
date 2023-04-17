import { Badge, Box, Heading, SimpleGrid } from '@chakra-ui/react';
import PageHeader from '../components/PageHeader';
import StadiumCard from '../components/StadiumCard';
import dbConnect from '../lib/dbConnect';
import Stadium from '../models/Stadium';

export default function Stadiums({ stadiums }) {
  const breadcrumb = [
    { href: '/', name: 'Home' },
    { href: '/stadiums', name: 'Stadiums' },
  ];
  return (
    <Box>
      <PageHeader breadcrumbs={breadcrumb} />
      <Heading>
        All Stadiums <Badge fontSize="lg">{stadiums.length}</Badge>
      </Heading>
      <SimpleGrid minChildWidth="240px" spacing="40px">
        {stadiums.map((stadium) => (
          <StadiumCard key={stadium._id} data={stadium} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await Stadium.find({}).lean();
  const stadiums = result.map((doc) => {
    const stadium = doc;
    stadium._id = stadium._id.toString();
    stadium.createdAt = stadium.createdAt.toString();
    stadium.updatedAt = stadium.updatedAt.toString();
    return stadium;
  });

  return { props: { stadiums: stadiums } };
}
