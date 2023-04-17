import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
interface IBreadcrum {
  href: string;
  name: string;
  isCurrentPage?: boolean;
}
interface PageHeaderProps {
  breadcrumbs: IBreadcrum[];
}
export default function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <Box>
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
    </Box>
  );
}
