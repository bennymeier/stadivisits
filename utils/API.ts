import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export const getUser = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

export const getStadium = (id: string) => {
    const { data, error, isLoading } = useSWR(`/api/users/${id}`, fetcher);
  
    return {
      stadium: data,
      isLoading,
      isError: error,
    };
  };

  export const getComment = (id: string) => {
    const { data, error, isLoading } = useSWR(`/api/comments/${id}`, fetcher);
  
    return {
      comment: data,
      isLoading,
      isError: error,
    };
  };