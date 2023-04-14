import { useRouter } from 'next/router';
import useSWR from 'swr';
import StadiumForm from '../../components/StadiumForm';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditStadium = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: stadium,
    error,
    isLoading,
  } = useSWR(id ? `/api/stadiums/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!stadium) return null;

  const stadiumForm = {
    name: stadium.name,
    longitude: stadium.longitude,
    latitude: stadium.latitude,
    city: stadium.city,
    country: stadium.country,
    constructionStart: stadium.constructionStart,
    visitedDate: stadium.visitedDate,
    opening: stadium.opening,
    costs: stadium.costs,
    capacity: stadium.capacity,
    avatar: stadium.avatar,
  };

  return (
    <StadiumForm
      formId="edit-stadium-form"
      stadiumForm={stadiumForm}
      forNewStadium={false}
    />
  );
};

export default EditStadium;
