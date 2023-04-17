import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

export default function StadiumCard({ data }) {
  const { name, capacity, country, city, image, _id } = data;
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image
            src={image}
            alt={`Stadium ${name} in ${city} in ${country}`}
            layout={'fill'}
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Stadium
          </Text>
          <Link href={`/stadium/${_id}`}>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
            >
              {name}
            </Heading>
          </Link>
          <Heading fontSize="small">
            Capacity: {capacity.toLocaleString('de-DE')}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
