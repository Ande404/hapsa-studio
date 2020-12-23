import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUser } from '../lib/db';

const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required(),
    title: yup.string().required(),
    objective: yup.string(),
  });
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);

    fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  };

  return (
    <div>
      <MasterWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <label>*Full name</label>
          <input
            placeholder='Full name'
            name='fullName'
            ref={register({ required: true })}
          />
          {errors.fullname ? <p>{errors.fullName?.message}</p> : ''}

          <label>*Title</label>
          <input
            placeholder='Title'
            name='title'
            ref={register({ required: true })}
          />
          {errors.title ? <p>{errors.title?.message}</p> : ''}

          <label>Objective</label>
          <textarea placeholder='Objective' name='objective' ref={register} />

          <label>Preferred Location</label>
          <select name='locationInterest' ref={register}>
            <option value='Erbil'>Erbil</option>
            <option value='Sulaymaniyah'>Sulaymaniyah</option>
            <option value='Duhok'>Duhok</option>
            <option value='Halabja'>Halabja</option>
          </select>
          <button>Send Resume</button>
        </StyledForm>
      </MasterWrapper>
    </div>
  );
};

const MasterWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  padding: 1rem;
`;

const StyledForm = styled.form`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr;
  font-size: 16px;

  input,
  textarea,
  select {
    padding: 0.8rem 0.4rem;
  }
`;

export default Form;
