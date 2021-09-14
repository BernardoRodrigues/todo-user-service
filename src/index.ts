
import { config } from 'dotenv';
import { resolve } from 'path'
if (process.env.NODE_ENV !== 'production') {
    console.log(resolve(__dirname, '..', '..', 'environments', `${process.env.NODE_ENV}.env`))
    config(
        {
            path: resolve(__dirname, '..', '..', 'environments', `${process.env.NODE_ENV}.env`)
        }
    )
}
// console.log(join(__dirname, '..', '..', 'src', 'cert'))
// console.log(join(__dirname))
// console.log(join(__dirname, '..'))

// readdirSync(join(__dirname,)).forEach((f) => console.log(`\n${f}`))
import express from 'express'
import logger from 'morgan'
// import { version } from '../package.json'
import { json } from 'body-parser'
import { createServer as createServerHttp } from 'http'
import userRouter from './routes/user-routes'



// console.log(resolve('environments', `${process.env.NODE_ENV}.env`))
// console.log("ENV: ", process.env)
const app = express();
const port = process.env.PORT || 3000;

const server = createServerHttp(
    // {
    //     cert: readFileSync(join(__dirname, 'cert', 'user-service.crt')),
    //     key: readFileSync(join(__dirname, 'cert', 'user-service.key'))
    // },
    app
        .use(logger('dev'))
        .use(json())
        // .use(cors)
        .use(`/service/user`, userRouter)
        .use('*', (_, res) => res.status(404).json({message: 'Page not found'}))
    )
    .listen(port, () => console.log(`Server started on port ${port}`))
process.on('SIGINT', () => { 
    console.log("\nServer shutting down...")
    server.close();
    process.exit(-1);
});
    

