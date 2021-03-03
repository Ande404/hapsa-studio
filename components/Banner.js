import NextLink from 'next/link';

const Banner = () => {
  return (
    <div>
      <NextLink href='/career-advice'>
        <Heading
          as={Link}
          size='md'
          letterSpacing='-.8px'
          fontWeight='semibold'
          mb='4'
        >
          Join our online career advice conference
          <ArrowForwardIcon ml='2' />
        </Heading>
      </NextLink>
      <hr
        style={{
          borderTop: '2px solid black',
          marginBottom: '2rem',
        }}
      />
    </div>
  );
};

export default Banner;
