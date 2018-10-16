import Joi from 'joi';
import Boom from 'boom';
import { verifyCredentials, authenticateUser, verifyUniqueUser, createUser } from '../handlers/auth';

const routeConfigs = [ {
        method: 'POST',
        path: '/api/user/authenticate',
        config: {
            description: 'Autenthicate',
            auth: false,
            pre: [{ method: verifyCredentials, assign: 'user'}],
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                  },
                failAction: (request, reply) =>
                    Boom.unauthorized('Incorrect email or password!'),
            }
        },
        handler: authenticateUser
    }, {
        method: 'POST',
        path: '/api/user',
        config: {
            description: 'Create a new user',
            auth: false,
            pre: [{ method: verifyUniqueUser, assign: 'user'}],
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                  },
                failAction: (request, reply) =>
                    Boom.unauthorized('Incorrect email or password!'),
            }
        },
        handler: createUser
    }
]

export default routeConfigs;