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
import { FiChevronDown } from 'react-icons/fi';
import NextLink from 'next/link';
export const AccountMenu = (props) => {
  return (
    <Box>
      <Menu>
        <MenuButton
          ml='4'
          as={Button}
          _hover={{ backgroundColor: 'none' }}
          rightIcon={<FiChevronDown />}
        >
          Account
        </MenuButton>
        <MenuList>
          <NextLink href='/account' passHref>
            <MenuItem as={Link} _hover={{ textDecoration: 'none' }}>
              Account
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

            <MenuItem onClick={() => console.log('logout')}>Log out</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};
