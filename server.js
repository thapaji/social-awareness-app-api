import express from "express";
import morgan from "morgan";
import cors from 'cors';
import routers from './src/routers/routers.js'
import filePath from 'path';
import { DBConnection } from "./src/config/DBConnection.js";

const app = express();

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan("dev"));
}
DBConnection();


/**********    MiddleWares       ******************/

app.use(express.json());
app.use(cors())
const __dirname = filePath.resolve();
app.use(express.static(filePath.join(__dirname, 'public')))


routers.forEach(({ path, middlewares }) => app.use(path, ...middlewares))

app.get('/', (req, res, next) => {
    res.json({
        message: 'server running healthy'
    })
})

app.use('*', (req, res, next) => {
    const err = new Error('404 Not Found')
    err.status = 404;
    next(err)
})


/*********    Global Error Handler   ***********/

app.use((error, req, res, next) => {
    console.log('-----------', error, '---------------')
    res.status(error.status || 500);
    res.json({
        status: 'error',
        message: error.message,
    })
})


/*********    run the server   ***********/

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server is running`);
});