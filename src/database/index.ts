import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      url:
        process.env.NODE_ENV === 'test'
          ? process.env.MONGO_URL_TEST
          : process.env.MONGO_URL_DEVELOPMENT
    }),
  );
};
