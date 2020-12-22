import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { gql } from 'graphql-request';
import * as yup from 'yup';
import { request } from '../lib/client';
import { Wrapper } from './atoms/Wrapper';
const INSERT_PROFILE = gql`
  mutation insertProfile($profile: profile_insert_input!) {
    insert_profile_one(object: $profile) {
      title
      first_name
    }
  }
`;

const inserProfile = async (userInfo) => {
  const data = await request(INSERT_PROFILE, {
    profile: {
      ...userInfo,
    },
  });
  return data;
};

const Form = () => {
  const [mutate] = useMutation(inserProfile, {});

  const schema = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    title: yup.string(),
    email: yup.string().email().required(),
    address: yup.string(),
    website: yup.string(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      mutate(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper bg='#000'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWapper>
          <GenericInput
            placeholder='First Name'
            ref={register}
            name='first_name'
          />

          <GenericInput
            placeholder='Last Name'
            ref={register}
            name='last_name'
          />

          <GenericInput placeholder='Email' ref={register} name='email' />
          <ErrorMsg>{errors.email && ' Email is required'}</ErrorMsg>

          <GenericInput placeholder='Title' ref={register} name='title' />

          <GenericInput placeholder='Address' ref={register} name='address' />
          <GenericInput placeholder='Website' ref={register} name='website' />

          <GenericInput type='submit' value='Submit' />
        </FormWapper>
      </form>
    </Wrapper>
  );
};

const FormWapper = styled.div`
  padding: 4rem 0;
  display: grid;
  grid-template-columns: 1fr;

  row-gap: 1em;
  font-family: 'Inter';
`;

const GenericInput = styled.input`
  width: 280px;
  padding: 5px 8px;
  height: 25px;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0;
`;

export default Form;
