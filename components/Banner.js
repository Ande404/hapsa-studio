import NextLink from 'next/link';

export const Banner = ({ children, arrow }) => (
  <div>
    <NextLink href="/">
      <a>{children}</a>
    </NextLink>
    <hr
      style={{
        borderTop: '2px solid black',
        marginTop: '10px',
      }}
    />
  </div>
);
