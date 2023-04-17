import { useState } from 'react';
import { useRouter } from 'next/router';
import { Link } from '@chakra-ui/next-js';
import dbConnect from '../../lib/dbConnect';
import Stadium from '../../models/Stadium';
import Image from 'next/image';
import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

const StadiumPage = ({ stadium }) => {
  const { name, capacity, country, city, image, _id } = stadium;
  const router = useRouter();
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    const stadiumID = router.query.id;

    try {
      await fetch(`/api/stadiums/${stadiumID}`, {
        method: 'Delete',
      });
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the stadium.');
    }
  };

  return (
    <Box>
      <Flex justifyContent="center" mb="3">
        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: useBreakpointValue({ base: '20%', md: '30%' }),
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'blue.400',
              zIndex: -1,
            }}
          >
            {name}
          </Text>
        </Heading>
      </Flex>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px"
              borderColor="gray.300"
            >
              <Heading fontSize="medium">Club Name</Heading>
              <Text>{name}</Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px"
              borderColor="gray.300"
            >
              <Heading fontSize="medium">Capacity</Heading>
              <Text>{capacity.toLocaleString('de-DE')}</Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px"
              borderColor="gray.300"
            >
              <Heading fontSize="medium">Country</Heading>
              <Text>{country}</Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px"
              borderColor="gray.300"
            >
              <Heading fontSize="medium">City</Heading>
              <Text>{city}</Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px"
              borderColor="gray.300"
            >
              <Heading fontSize="medium">Club Name</Heading>
              <Text>{name}</Text>
            </Flex>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Link href={`/stadium/${stadium._id}/edit`}>
                <Button
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Edit Stadium
                </Button>
              </Link>

              <Button rounded={'full'} colorScheme="red">
                Delete
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={`Stadium ${name} in ${city} in ${country}`}
            objectFit={'cover'}
            src={image}
            width={600}
            height={400}
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const stadium = await Stadium.findById(params.id).lean();
  stadium._id = stadium._id.toString();
  stadium.createdAt = stadium.createdAt.toString();
  stadium.updatedAt = stadium.updatedAt.toString();
  return { props: { stadium } };
}

export default StadiumPage;
