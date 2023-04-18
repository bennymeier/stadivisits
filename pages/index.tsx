import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Stadium from '../models/Stadium';
import { Box, Button, SimpleGrid, useToast } from '@chakra-ui/react';
import { fakeStadiums, fakeUsers } from '../utils/getFakeData';
import StadiumCard from '../components/StadiumCard';

const Index = ({ stadiums }) => {
  const toast = useToast();
  const postStadium = async (form) => {
    try {
      const res = await fetch('/api/stadiums', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      toast({
        title: 'Success',
        description: 'Stadiums generated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create stadiums.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const postUser = async (form) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      toast({
        title: 'Success',
        description: 'Users generated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create users.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const generateStadiums = () => {
    const stadiums = fakeStadiums;
    console.log('Stadiums: ', stadiums);
    stadiums.map((stadium) => postStadium(stadium));
  };

  const generateUsers = () => {
    const users = fakeUsers;
    console.log('Users: ', users);
    users.map((user) => postUser(user));
  };
  return (
    <>
      <Box mt={3}>
        <Button onClick={generateStadiums} mr={4}>
          Generate 4 Stadiums
        </Button>
        <Button onClick={generateUsers}>Generate 4 Users</Button>
      </Box>
      <SimpleGrid minChildWidth="240px" spacing="40px">
        {stadiums.map((stadium) => (
          <StadiumCard key={stadium._id} data={stadium} />
        ))}
      </SimpleGrid>
      {stadiums.map((stadium) => (
        <div key={stadium._id}>
          <div className="card">
            <img src={stadium.image_url} />
            <h5 className="stadium-name">{stadium.name}</h5>
            <div className="main-content">
              <p className="stadium-name">{stadium.name}</p>
              <p className="owner">Owner: {stadium.owner_name}</p>
              <div className="btn-container">
                <Link
                  href="/[id]/edit"
                  as={`/${stadium._id}/edit`}
                  legacyBehavior
                >
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href="/[id]" as={`/${stadium._id}`} legacyBehavior>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const result = await Stadium.find({});
  const stadiums = result.map((doc) => {
    const stadium = doc.toObject();
    stadium._id = stadium._id.toString();
    stadium.createdAt = stadium.createdAt.toString();
    stadium.updatedAt = stadium.updatedAt.toString();
    return stadium;
  });

  return { props: { stadiums: stadiums } };
}

export default Index;
