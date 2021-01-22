import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      url: 'mongodb+srv://mongodb:root@clusterplanets.h5k8a.mongodb.net/starwars?retryWrites=true&w=majority'
    }),
  );
};
