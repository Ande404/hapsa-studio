import {
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Input,
  Divider,
  Select,
  CheckboxGroup,
  Checkbox,
  Stack,
  Button,
} from '@chakra-ui/react';
import Nav from '../../components/Nav';
import { getAllJobId } from '../../lib/firestore';
import JobListing from '../../components/JobListing';
import { ChakraContainer } from '../../components/atoms/Container';

const Jobs = ({ jobs }) => {
  return (
    <div>
      <Nav />
      <ChakraContainer mt='20'>
        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns={{ base: 'inherit', lg: 'repeat(8, 1fr)' }}
          gridRowGap='16'
        >
          <GridItem
            colSpan={{ base: 6, lg: 2 }}
            borderWidth='1px'
            w='100%'
            rounded='lg'
          >
            <Box p='4' w='100%'>
              <Text fontWeight='semibold' fontSize='xl'>
                Filter
              </Text>
              <form>
                <Input
                  placeholder='Search by title or company'
                  my='6'
                  variant='filled'
                  size='md'
                  fontSize='sm'
                />
                <Divider />
                <Box mt='6'>
                  <Text fontWeight='semibold' mb='2'>
                    Location
                  </Text>
                  <Select>
                    <option value='Erbil'>Erbil</option>
                    <option value='Slemani'>Slemani</option>
                    <option value='Duhok'>Duhok</option>
                    <option value='Kirkuk'>Kirkuk</option>
                    <option value='Halabja'>Halabja</option>
                  </Select>
                </Box>
                <Box mt='6'>
                  <Text fontWeight='semibold' mb='2'>
                    Job type
                  </Text>
                  <CheckboxGroup colorScheme='blue'>
                    <Stack>
                      <Checkbox value='naruto'>Full-time</Checkbox>
                      <Checkbox value='sasuke'>Part-time</Checkbox>
                      <Checkbox value='kakashi'>Contract</Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </Box>
                <Button
                  mt='6'
                  size='md'
                  color='gray.900'
                  bg='gray.200'
                  color='gray.900'
                  _hover={{
                    bg: 'gray.300',
                  }}
                  rounded='md'
                  onClick={() => alert('beep')}
                >
                  Filter
                </Button>
              </form>
            </Box>
          </GridItem>
          <GridItem
            colSpan={6}
            mt={{ base: '16', lg: 0 }}
            ml={{ base: 0, lg: 10 }}
          >
            <Heading
              letterSpacing='-1px'
              pb='12'
              size='md'
              fontWeight='semibold'
            >
              Recently Posted
            </Heading>

            <JobListing jobs={jobs} />
          </GridItem>
        </Grid>
      </ChakraContainer>
    </div>
  );
};

export async function getStaticProps() {
  const jobs = await getAllJobId();

  return {
    props: { jobs },
  };
}

export default Jobs;
