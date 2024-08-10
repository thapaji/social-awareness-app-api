import userRouter from './userRouter.js';
import businessRouter from './businessRouter.js';
import advertisementRouter from './advertisementRouter.js';
import causeRouter from './causeRouter.js';
import eventRouter from './eventRouter.js';

export default [
    {
        path: '/api/users',
        middlewares: [userRouter],
    },
    {
        path: '/api/businesses',
        middlewares: [businessRouter],
    },
    {
        path: '/api/advertisements',
        middlewares: [advertisementRouter],
    },
    {
        path: '/api/causes',
        middlewares: [causeRouter],
    },
    {
        path: '/api/events',
        middlewares: [eventRouter],
    },
];
