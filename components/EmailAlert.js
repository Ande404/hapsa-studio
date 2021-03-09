import { Box, Link, Alert, AlertIcon, Text } from '@chakra-ui/react';

export const EmailAlert = ({ user }) => (
  <div>
    <Box>
      {!user.email_verified && (
        <Alert status="warning">
          <AlertIcon />
          Please verify your email address through your
          <Text textDecoration="underline" fontWeight="semibold">
            <Link
              isExternal
              // feels good to be a gangsta
              ml="1"
              href={
                // eslint-disable-next-line no-nested-ternary
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
