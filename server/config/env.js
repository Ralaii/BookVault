import dotenv from 'dotenv';

const mode = process.env.APP_ENV || 'local';
const result = dotenv.config({ path: `.env.${mode}` });
