import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  return response.json({ message: 'Hello World' });
});

usersRouter.post('/', async (request, response) => {
  return response.json({ message: 'Hello World' });
});

usersRouter.put('/', async (request, response) => {
  return response.json({ message: 'Hello World' });
});

usersRouter.delete('/:id', async (request, response) => {
  return response.status(204).json({ message: 'Hello World' });
});

export default usersRouter;
