import express from 'express';
import { AdminRoutes } from '../app/modules/admin/admin.routes';
import { testRouter } from '../app/modules/test/route/test.route';

const router = express.Router();

const apiRoutes = [
  {
    path: '/test-2',
    route: testRouter,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export const router2 = router;
