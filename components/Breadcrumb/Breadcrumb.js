import {
  Box,
  Breadcrumb as StyledBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export const Breadcrumb = ({ linkItems }) => (
  <StyledBreadcrumb fontSize="sm" fontWeight="400" mt="10">
    <BreadcrumbItem isCurrentPage>
      <NextLink href="/dashboard" passHref>
        <BreadcrumbLink
          as={Link}
          _hover={{ textDecoration: 'none' }}
          letterSpacing="-0.2px"
        >
          Dashboard
        </BreadcrumbLink>
      </NextLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <NextLink letterSpacing="-0.2px" href="/account" passHref>
        <BreadcrumbLink as={Link} _hover={{ textDecoration: 'none' }}>
          Account
        </BreadcrumbLink>
      </NextLink>
    </BreadcrumbItem>
  </StyledBreadcrumb>
);
