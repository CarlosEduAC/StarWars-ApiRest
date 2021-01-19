import { Router } from 'express';

import PlanetRouter from './planet.routes';

const routes = Router();

routes.use('/planet', PlanetRouter);

export default routes;
