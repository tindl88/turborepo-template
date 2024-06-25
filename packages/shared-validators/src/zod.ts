import { z } from 'zod';

export const baseValidator = {
  uuid: z.string().uuid({ message: 'validator_id_should_be_an_uuid' }),
  uuidArray: z.object({ id: z.string().uuid({ message: 'validator_id_should_be_an_uuid' }) }).array(),
  userName: z.string().min(1, 'validator_at_least_n_character').max(50, 'validator_maximum_n_characters_allowed'),
  email: z
    .string()
    .email('validator_email_is_invalid')
    .min(1, 'validator_at_least_n_character')
    .max(320, 'validator_maximum_n_characters_allowed'),
  password: z
    .string()
    .min(8, 'validator_at_least_n_character')
    .max(255, 'validator_maximum_n_characters_allowed')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])(?=.*[0-9]).{6,}$/,
      'validator_password_rule'
    ),
  phoneNumber: z.string().regex(/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/, 'validator_phone_number_is_invalid'),
  role: z.enum(['user', 'admin', 'super_admin'], { required_error: 'validator_select_role' }),
  status: z.string({ required_error: 'validator_select_status' }).min(1, 'validator_at_least_n_character'),
  title: z.string().min(1, 'validator_at_least_n_character').max(255, 'validator_maximum_n_characters_allowed'),
  content: z.string().min(1, 'validator_at_least_n_character')
};
