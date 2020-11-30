import React from 'react';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  font-family: 'Manrope', sans-serif;
`;
export default Layout;
