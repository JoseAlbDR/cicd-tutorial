import { Router } from 'express';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/single/:destiny');

    return router;
  }
}
