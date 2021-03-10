import * as yup from 'yup';

export const applicationSchema = yup.object().shape({
  jobId: yup.string().required(),
  uid: yup.string().required(),
  created_at: yup.date().default(new Date()),
  updated_at: yup.date().default(new Date()),
  deleted_at: yup.date().optional(),
});
