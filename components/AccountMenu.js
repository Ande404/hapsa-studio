import NextLink from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import {
  Box,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Menu,
  Button,
  MenuGroup,
  Link,
} from '@chakra-ui/react';

export const AccountMenu = ({ user, signOut }) => {
  
  const handleSignout = async () => {
    signOut();
    window.location.href = '/';
  };
  return (
    <Box>
      <Menu bg="gray.50" color="gray.900">
        <MenuButton
          size="sm"
          bg="none"
          ml="4"
          rounded="sm"
          as={Button}
          bg="gray.100"
          color="black"
          rightIcon={<FiChevronDown />}
        >
          {user.provider === "password" ? user.email.split("@")[0] : user.name}
        </MenuButton>
        <MenuList bg="gray.50" mt="3" color="gray.900">
          <NextLink href="/account" passHref>
            <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
              Account
            </MenuItem>
          </NextLink>

          <MenuDivider />
          <MenuGroup title="Help">
            <NextLink href="/account" passHref>
              <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
                Docs
              </MenuItem>
            </NextLink>
            <NextLink href="/account" passHref>
              <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
                FAQ
              </MenuItem>
            </NextLink>
            <MenuItem onClick={handleSignout}>Log out</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};
