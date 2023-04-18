import { useRouter } from 'next/router';
import { Link } from '@chakra-ui/next-js';
import dbConnect from '../../lib/dbConnect';
import Stadium from '../../models/Stadium';
import Comment from '../../models/Comment';
import Image from 'next/image';
import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
  Grid,
} from '@chakra-ui/react';
import PageHeader from '../../components/PageHeader';
import CommentSection from '../../components/CommentSection';
import User from '../../models/User';
import VisitedStar from '../../components/VisitedStar';

const StadiumPage = ({ stadium, comments, users }) => {
  const { name, capacity, country, city, image, _id } = stadium;
  const breadcrumb = [
    { href: '/', name: 'Home' },
    { href: '/stadiums', name: 'Stadiums' },
    { href: `/stadium/${_id}`, name, isCurrentPage: true },
  ];
  const router = useRouter();
  const toast = useToast();
  const handleDelete = async () => {
    const stadiumID = router.query.id;

    try {
      await fetch(`/api/stadiums/${stadiumID}`, {
        method: 'DELETE',
      });
      toast({
        title: 'Success',
        description: 'Deleted Stadium.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the stadium.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <PageHeader breadcrumbs={breadcrumb} />
      <Grid gridTemplateColumns={'auto minmax(200px, 300px)'}>
        <Box>
          <Flex justifyContent="center" mb="3" alignItems="flex-end" gap="2">
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
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
            <VisitedStar stadium={stadium} users={users} />
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

                  <Button
                    rounded={'full'}
                    colorScheme="red"
                    onClick={handleDelete}
                  >
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
        <Box>
          <Box m="3" borderLeft="1px" borderColor="gray.300" px="4">
            <CommentSection comments={comments} users={users} />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const stadium = await Stadium.findById(params.id).lean();
  stadium._id = stadium._id.toString();
  stadium.createdAt = stadium.createdAt.toString();
  stadium.updatedAt = stadium.updatedAt.toString();

  const allComments = await Comment.find({ stadium: stadium._id })
    .populate({
      path: 'author',
      model: User,
    })
    .lean();
  const comments = allComments.map((doc) => {
    const comment = doc;
    comment._id = comment._id.toString();
    comment.stadium = comment.stadium.toString();
    comment.createdAt = comment.createdAt.toString();
    comment.updatedAt = comment.updatedAt.toString();
    comment.author._id = comment.author._id.toString();
    comment.author.createdAt = comment.author.createdAt.toString();
    comment.author.updatedAt = comment.author.updatedAt.toString();
    return comment;
  });

  const allUsers = await User.find().lean();
  const users = allUsers.map((doc) => {
    const user = doc;
    user._id = user._id.toString();
    user.createdAt = user.createdAt.toString();
    user.updatedAt = user.updatedAt.toString();
    return user;
  });

  return { props: { stadium, comments, users } };
}

export default StadiumPage;
