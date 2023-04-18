import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Link } from '@chakra-ui/next-js';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import StadiumForm from '../components/StadiumForm';

export default function AddStadium() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const toast = useToast();
  const onSubmit = (data) => {
    console.log(data);
    postData(data);
  };

  const postData = async (form) => {
    setIsLoading(true);
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
      setIsLoading(false);
      router.push('/login');
    } catch (error) {
      setIsLoading(true);
      toast({
        title: 'Error',
        description: 'Failed to register.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <StadiumForm />
    </Box>
  );
}
