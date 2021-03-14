/* eslint-disable react/jsx-props-no-spreading */
import { Box, Link, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { useReducer } from 'react';

export const EmailAlert = ({ user, ...props }) => {
  const getAuthProvider = (provider) => {
    switch (provider) {
      case 'password':
        return false;
      case 'google.com':
        return 'https://www.google.com/gmail/about/#';
      case 'twitter.com':
        return 'https://twitter.com/login';
      case 'facebook.com':
        return 'https://www.google.com/gmail/about/#';
      default:
        break;
    }
  };

  return (
    <div>
      <Box {...props} rounded="md">
        {!user.email_verified && (
          <Alert status="warning" fontWeight="semibold">
            <AlertIcon />
            <Text letterSpacing="-.1px">
              Please verify your email address through your
            </Text>
            <Text textDecoration="underline">
              <Link
                isExternal
                // feels good to be a gangsta
                ml="1"
                href={getAuthProvider(user.firebase.sign_in_provider)}
              >
                provider.
              </Link>
            </Text>
          </Alert>
        )}
      </Box>
    </div>
  );
};
