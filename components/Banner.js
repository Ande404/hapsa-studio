import NextLink from 'next/link';
export const Banner = ({ children, arrow }) => {
  return (
    <div>
      <NextLink href='/career-advice'>{children}</NextLink>
      <hr
        style={{
          borderTop: '2px solid black',
          marginTop: '10px',
        }}
      />
    </div>
  );
};
