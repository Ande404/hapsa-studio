import { Button, ButtonGroup, Flex, GridItem } from '@chakra-ui/react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { CopyIcon } from '@chakra-ui/icons';

export const SocialButtonGroup = ({ onCopy }) => (
  <ButtonGroup variant="outline" spacing="6" my="8">
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      justify="center"
      align={{ base: 'start', lg: 'center' }}
    >
      <Button colorScheme="facebook" size="sm" leftIcon={<FaFacebook />}>
        Share on Facebook
      </Button>

      <Button
        size="sm"
        colorScheme="twitter"
        leftIcon={<FaTwitter />}
        mx={{ base: 0, lg: 2 }}
        my={{ base: 2, lg: 0 }}
      >
        Share on Twitter
      </Button>
      <Button
        size="sm"
        colorScheme="black"
        leftIcon={<CopyIcon />}
        onClick={onCopy}
      >
        Copy URL
      </Button>
    </Flex>
  </ButtonGroup>
);
