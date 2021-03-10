import * as yup from 'yup';

export const jobSchema = yup.object().shape({
  title: yup.string().max(42),
  status: yup.string().trim().required(),
  remote: yup.bool().default(false).optional(),
  governorate: yup.string().required(),
  description: yup.string().required(),
  career_level: yup.string().required(),
  job_type: yup.string().required(),
  industry_tags: yup.array().required(),
  number_of_hires: yup.number().default(1).optional(),
  recruiter_notes: yup.string().optional(),
  external_link: yup.string().url().optional(),
  created_at: yup.date().default(new Date()).optional(),
  updated_at: yup.date().default(new Date()).optional(),
  deleted_at: yup.date().optional(),
});
