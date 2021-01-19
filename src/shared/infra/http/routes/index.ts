import { Router } from 'express';

import PlanetRouter from '@modules/planets/infra/http/routes/planet.routes';

const routes = Router();

routes.use('/planet', PlanetRouter);

export default routes;
