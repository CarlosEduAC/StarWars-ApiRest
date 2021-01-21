import { createConnection, getConnectionOptions, Connection } from 'typeorm';

import baseUrls from '../config/baseUrls';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      useUnifiedTopology: process.env.NODE_ENV === 'test' ? false : true,
      url:
        process.env.NODE_ENV === 'test'
          ? baseUrls.test
          : baseUrls.development
    }),
  );
};
