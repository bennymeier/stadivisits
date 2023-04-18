import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Text,
  Switch,
} from '@chakra-ui/react';
import { FaUserAlt, FaRegMoon, FaSignOutAlt } from 'react-icons/fa';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';

const Links = [
  { url: '/', text: 'Home' },
  { url: '/stadiums', text: 'Stadiums' },
  { url: '/comments', text: 'Comments' },
  { url: '/users', text: 'Users' },
  // { url: '/add-stadium', text: 'Add Stadium' },
  { url: '/register', text: 'Sign up' },
  { url: '/login', text: 'Sign in' },
];

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Stadivists</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <Link
                  key={link.url}
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
                  href={link.url}
                >
                  {link.text}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                _hover={{ textDecoration: 'none' }}
              >
                <Flex alignItems="center" gap="10px">
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <Box>
                    <Heading fontSize="xs">Ariana Grande</Heading>
                    <Text fontSize="2xs" color="gray.400">
                      ariana.grande@gmail.com
                    </Text>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaUserAlt />}>Account settings</MenuItem>
                <MenuItem icon={<FaRegMoon />}>
                  Dark mode <Switch ml="3" />
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<FaSignOutAlt />}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link
                  key={link.url}
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
                  href={link.url}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
