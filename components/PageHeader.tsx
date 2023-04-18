import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { FaFutbol, FaPlus, FaUserAlt } from 'react-icons/fa';
interface IBreadcrum {
  href: string;
  name: string;
  isCurrentPage?: boolean;
}
interface PageHeaderProps {
  breadcrumbs: IBreadcrum[];
  showAddButtons?: boolean;
}
export default function PageHeader({
  breadcrumbs,
  showAddButtons = false,
}: PageHeaderProps) {
  return (
    <Flex
      borderBottom="1px"
      borderColor="gray.300"
      pb="2"
      justifyContent="space-between"
      alignItems="center"
    >
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        {breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem
            isCurrentPage={breadcrumb.isCurrentPage}
            key={breadcrumb.name}
          >
            <Link href={breadcrumb.href} as={BreadcrumbLink}>
              {breadcrumb.name}
            </Link>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      {showAddButtons && (
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaPlus />}
              rightIcon={<ChevronDownIcon />}
            >
              Add
            </MenuButton>
            <MenuList minWidth="unset">
              <MenuItem
                icon={<FaUserAlt />}
                as={Link}
                href="/add-user"
                _hover={{ textDecoration: 'none' }}
              >
                Add User
              </MenuItem>
              <MenuItem
                icon={<FaFutbol />}
                as={Link}
                href="/add-stadium"
                _hover={{ textDecoration: 'none' }}
              >
                Add Stadium
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Flex>
  );
}
