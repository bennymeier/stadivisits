import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import PageHeader from '../../../components/PageHeader';
import StadiumForm from '../../../components/StadiumForm';

const breadcrumb = [
  { href: '/', name: 'Home' },
  { href: '/stadiums', name: 'Stadiums' },
  { href: '/', name: 'Edit', isCurrentPage: true },
];

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

  return (
    <Box>
      <PageHeader breadcrumbs={breadcrumb} />
      <StadiumForm stadiumForm={stadium} />
    </Box>
  );
};

export default EditStadium;
