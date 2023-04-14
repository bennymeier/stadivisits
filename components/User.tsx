import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

const StadiumForm = ({ formId, stadiumForm, forNewStadium = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: stadiumForm.name,
    longitude: stadiumForm.longitude,
    latitude: stadiumForm.latitude,
    city: stadiumForm.city,
    country: stadiumForm.country,
    constructionStart: stadiumForm.constructionStart,
    visitedDate: stadiumForm.visitedDate,
    opening: stadiumForm.opening,
    costs: stadiumForm.costs,
    capacity: stadiumForm.capacity,
    avatar: stadiumForm.avatar,
  });

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
    } catch (error) {
      setMessage('Failed to update pet');
    }
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
    } catch (error) {
      setMessage('Failed to add stadium');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const formValidate = () => {
    let err: any = {};
    if (!form.name) err.name = 'Name is required';
    if (!form.city) err.city = 'City is required';
    if (!form.country) err.country = 'Country is required';
    if (!form.opening) err.opening = 'Opening is required';
    if (!form.constructionStart)
      err.constructionStart = 'Construction Start is required';
    if (!form.costs) err.costs = 'Costs is required';
    if (!form.capacity) err.capacity = 'Capacity is required';
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewStadium ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
        />

        <label htmlFor="constructionStart">Construction Start</label>
        <input
          type="text"
          name="constructionStart"
          value={form.constructionStart}
          onChange={handleChange}
        />

        <label htmlFor="opening">Opening</label>
        <input
          type="text"
          name="opening"
          value={form.opening}
          onChange={handleChange}
        />

        <label htmlFor="constructionStart">Construction Start</label>
        <input
          type="text"
          name="constructionStart"
          value={form.constructionStart}
          onChange={handleChange}
        />

        <label htmlFor="costs">Costs</label>
        <input
          type="text"
          name="costs"
          value={form.costs}
          onChange={handleChange}
        />

        <label htmlFor="capacity">Capacity</label>
        <input
          type="text"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Add Stadium
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default StadiumForm;
