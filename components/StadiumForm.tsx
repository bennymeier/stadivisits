import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
} from '@chakra-ui/react';

const StadiumForm = ({ formId, stadiumForm, forNewStadium = true }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const onSubmit = (data) => {
    console.log(data);
    postData(data);
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

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const errs = formValidate();
  //   if (Object.keys(errs).length === 0) {
  //     forNewStadium ? postData(form) : putData(form);
  //   } else {
  //     setErrors({ errs });
  //   }
  // };

  return (
    <>
      <Box>
        {error && <p>{error}</p>}
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
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea {...register('description')} />
          </FormControl>
          <FormControl id="submit">
            <Button type="submit">Create Stadium</Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default StadiumForm;
