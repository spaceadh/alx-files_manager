// server.js
import express from 'express';
import injectRoutes from './routes';
import envLoader from './utils/env_loader.js';

// Load environment variables
envLoader();

const app = express();

const injectMiddlewares = (app) => {
    app.use(express.json({ limit: '200mb' }));
};

injectMiddlewares(app);

// const port = process.env.PORT || 5000;

// app.use(routes);
injectRoutes(app);
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
const startServer = (api) => {
    envLoader();
    const port = process.env.PORT || 5000;
    const env = process.env.npm_lifecycle_event || 'dev';
    api.listen(port, () => {
      console.log(`[${env}] API has started listening at port:${port}`);
    });
};

startServer(app);