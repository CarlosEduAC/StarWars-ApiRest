import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const url = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;

  const entities = process.env.NODE_ENV === 'production'
    ? ["./dist/models/*.ts"] : ["./src/models/*.ts"];

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      url: url,
      entities
    }),
  );
};
