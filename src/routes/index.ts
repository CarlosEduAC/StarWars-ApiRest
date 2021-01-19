import { Router } from 'express';

import PlanetRouter from './planet.routes';

const routes = Router();

routes.use('/planets', PlanetRouter);

export default routes;
