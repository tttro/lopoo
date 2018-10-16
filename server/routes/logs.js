import Joi from 'Joi';
import { getAllLogs, createLog, updateLog, deleteLog } from '../handlers/logs';
import { authUser } from '../utils/auth'

const routeConfigs = [
    {
        method: 'GET',
        path: '/api/logs',
        config: {
            description: 'Returns all logs by User',
            pre: [{ method: authUser, assign: 'user' }],
            auth: { strategy: 'jwt', scope: ['user'] },
        },
        handler: getAllLogs
    }, {
        method: 'POST',
        path: '/api/logs',
        config: {
            description: 'Create a new log by User',
            pre: [{ method: authUser, assign: 'user' }],
            auth: { strategy: 'jwt', scope: ['user'] },
            validate: {
                payload: {
                    mileage: Joi.number().positive().required(),
                    liters: Joi.number().positive().required(),
                    price: Joi.number().positive().required(),
                },
            }
        },
        handler: createLog
    }, {
        method: 'PUT',
        path: '/api/logs/{id}',
        config: {
            description: 'Update a log',
            pre: [{ method: authUser, assign: 'user' }],
            auth: { strategy: 'jwt', scope: ['user'] },
            validate: {
                payload: {
                    mileage: Joi.number().positive().required(),
                    liters: Joi.number().positive().required(),
                    price: Joi.number().positive().required(),
                },
                params: {
                    id: Joi.number().positive().required()
                }
            }
        },
        handler: updateLog
    }, {
        method: 'DELETE',
        path: '/api/logs/{id}',
        config: {
            description: 'Delete a log by id',
            pre: [{ method: authUser, assign: 'user' }],
            auth: { strategy: 'jwt', scope: ['user'] },
            validate:{
                params: {
                    id: Joi.number().positive().required()
                }
            }
        },
        handler: deleteLog
    }
];

export default routeConfigs;