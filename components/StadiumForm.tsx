import React from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const StadiumForm = ({ defaultValues = null }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({ defaultValues });
  const onSubmit = (data) => {
    console.log(data);
    putData(data);
  };
  const contentType = 'application/json';

  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/stadiums/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const { data } = await res.json();

      mutate(`/api/stadiums/${id}`, data, false);
      router.push('/');
    } catch (error) {}
  };

  const postData = async (form) => {
    try {
      const res = await fetch('/api/stadiums', {
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

      router.push('/');
    } catch (error) {}
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input {...register('name', { required: true })} />
          </FormControl>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input {...register('city', { required: true })} />
          </FormControl>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input {...register('country', { required: true })} />
          </FormControl>
          <FormControl id="capacity">
            <FormLabel>Capacity</FormLabel>
            <Input
              type="number"
              {...register('capacity', { required: true })}
            />
          </FormControl>
          <FormControl id="image">
            <FormLabel>Image URL</FormLabel>
            <Input {...register('image', { required: true })} />
          </FormControl>
          <FormControl id="submit">
            <Button type="submit">Add Stadium</Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default StadiumForm;
