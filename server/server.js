import Hapi from 'hapi';
import hapiRouter from 'hapi-router'; 
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import config from './utils/config';
import { validateJwt } from './utils/auth';

const startServer = async () => {
   
    const server = new Hapi.server({
        port: config.server.port,
        host: config.server.host,
        routes: {
            cors: true
        }
    });

    await server.register(hapiAuthJwt2);

    server.auth.strategy('jwt', 'jwt', {
        key: config.auth.secret,
        validate: validateJwt,
        verifyOptions: { algorithms: config.auth.algorithms },
    });

    server.auth.default('jwt');

    // Add routes after jwt is set
    await server.register({
        plugin: hapiRouter,
        options: {
            cwd: __dirname,
            routes: 'routes/*.js'
        }
    });
    
    await server.start();
    return server;
};

startServer()
    .then(server => {
        console.log('Server running at:', server.info.uri);
    })
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
