import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const url = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL_DEVELOPMENT;

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      url: url
    }),
  );
};
