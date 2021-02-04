import { useRouter } from 'next/router';
import {
  Button,
  Box,
  Flex,
  Spacer,
  Image,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuList,
  ArrowForwardIcon,
  Link,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FiTriangle, FiChevronDown } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
const Nav = (props) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/login');
  };
  return (
    <Flex
      px={{ base: '24px', md: '40px' }}
      py='2'
      justify='space-between'
      align='center'
      bg='gray.600'
    >
      <Box p='2'>
        <Heading size='md' color='white'>
          <Link href='/'>
            <FiTriangle stroke='white' />
          </Link>
        </Heading>
      </Box>
      <Spacer />
      <Box>
        {props.status?.uid ? (
          <Flex>
            <Image
              borderRadius='full'
              boxSize='40px'
              src={props.status.picture}
              alt='User avatar'
            />
            <Menu>
              <MenuButton
                ml='4'
                as={Button}
                _hover={{ backgroundColor: 'none' }}
                rightIcon={<FiChevronDown />}
              >
                {props.status.name}
              </MenuButton>
              <MenuList>
                <NextLink href='/account' passHref>
                  <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
                    Account
                  </MenuItem>
                </NextLink>

                <NextLink href='/account' passHref>
                  <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
                    Storage
                  </MenuItem>
                </NextLink>

                <MenuDivider />
                <MenuGroup title='Help'>
                  <NextLink href='/account' passHref>
                    <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
                      Docs
                    </MenuItem>
                  </NextLink>
                  <NextLink href='/account' passHref>
                    <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
                      FAQ
                    </MenuItem>
                  </NextLink>

                  <MenuItem onClick={props.logout}>Log out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        ) : router.pathname !== '/login' ? (
          <Button size='sm' onClick={handleClick}>
            Sign up
          </Button>
        ) : (
          <Button
            bg='brand.600'
            color='dark'
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Nav;
