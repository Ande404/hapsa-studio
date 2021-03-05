import {
  Box,
  Heading,
  Flex,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Image,
  Alert,
  AlertIcon,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Badge,
  TableCaption,
  Spacer,
} from '@chakra-ui/react';
export const EmailAlert = ({ user }) => {
  return (
    <div>
      <Box>
        {!user.email_verified && (
          <Alert status='warning'>
            <AlertIcon />
            Please verify your email address through your
            <Text textDecoration='underline' fontWeight='semibold'>
              <Link
                isExternal
                // feels good to be a gangsta
                ml='1'
                href={
                  user.firebase.sign_in_provider === 'google.com'
                    ? 'https://www.google.com/gmail/about/#'
                    : user.firebase.sign_in_provider === 'twitter.com'
                    ? 'https://twitter.com/login'
                    : 'https://fb.com/login'
                }
              >
                provider
              </Link>
            </Text>
          </Alert>
        )}
      </Box>
    </div>
  );
};
