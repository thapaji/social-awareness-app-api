import userRouter from "./userRouter.js";

export default [
    {
        path: '/api/users',
        middlewares: [userRouter],
    },
]