import { typeormConfig } from './orm.config';

export const appConfig = () => ({
  port: process.env.PORT,
  database: {
    ...typeormConfig,
  },
});
