// routes/index.js
import { Express } from 'express';
import express from 'express';
import AppController from '../controllers/AppController.js';


/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */

const injectRoutes = (api) => { 
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);

    api.all('*', (req, res, next) => {
        errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
      });
    api.use(errorResponse);
}
// const router = express.Router();
export default injectRoutes;
// router.get('/status', AppController.getStatus);
// router.get('/stats', AppController.getStats);

// export default router;