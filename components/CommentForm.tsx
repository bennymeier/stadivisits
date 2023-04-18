import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';

const CommentForm = ({ commentForm = null, users }) => {
  const router = useRouter();
  const toast = useToast();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { text: faker.lorem.text(), ...commentForm },
  });
  const onSubmit = (data, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = router.query;
    const fullData = { stadium: id, ...data };
    postData(fullData);
  };
  const contentType = 'application/json';

  const postData = async (form) => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      toast({
        title: 'Success',
        description: 'Added Comment.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setValue('text', faker.lorem.sentence());
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment to the stadium.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="author">
            <FormLabel>Author</FormLabel>
            <Select
              {...register('author', { required: true })}
              placeholder="Select User"
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="text">
            <FormLabel>Text</FormLabel>
            <Input {...register('text', { required: true })} />
          </FormControl>
          <FormControl id="submit" mt="3">
            <Button type="submit">Add Comment</Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default CommentForm;
