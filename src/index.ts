
import { config } from 'dotenv';
import { join, resolve } from 'path'
if (process.env.NODE_ENV !== 'production') {
    console.log(resolve(__dirname, '..', '..', 'environments', `${process.env.NODE_ENV}.env`))
    config(
        {
            path: resolve(__dirname, '..', '..', 'environments', `${process.env.NODE_ENV}.env`)
        }
    )
}
import { readFileSync, readdirSync } from 'fs';
// console.log(join(__dirname, '..', '..', 'src', 'cert'))
// console.log(join(__dirname))
// console.log(join(__dirname, '..'))

// readdirSync(join(__dirname,)).forEach((f) => console.log(`\n${f}`))
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { initialize, use } from 'passport';

import express from 'express'
import logger from 'morgan'
// import { version } from '../package.json'
import { json } from 'body-parser'
import { createServer as createServerHttps } from 'https'
import { createServer as createServerHttp } from 'http'
import userRouter from './routes/user-routes'




use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: readFileSync(join(__dirname,'cert', 'user-service.key'))
    },
    (payload, done) => {
        console.log(`Jwt Payload: ${payload}`)
        console.table(payload)
        return done(null, {user: true});
    })
)
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
        .use(initialize())
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
    

