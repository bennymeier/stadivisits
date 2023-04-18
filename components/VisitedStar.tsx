import { IconButton, Box } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

export default function VisitedStar({ users, stadium }) {
  const randomnizedUserIds = () => {
    const userIds = users.map((user) => user._id);
    const randomNr = Math.floor(Math.random() * userIds.length);
    return userIds[randomNr];
  };
  const handleClick = () => {
    console.log('Stadium: ', stadium);
    console.log('Randomnized: ', randomnizedUserIds());
  };
  return (
    <Box>
      <IconButton
        aria-label=""
        variant="ghost"
        _hover={{ color: 'yellow' }}
        icon={<FaStar />}
        onClick={handleClick}
      />
    </Box>
  );
}
