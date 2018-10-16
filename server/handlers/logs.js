
import { dbGetAllLogsByUser, dbDeleteLog, dbUpdateLog, dbCreateLog } from '../models/log'
import Boom from 'boom';

export const getAllLogs = async (request, reply) => {

    const userId = request.pre.user.id;
    const username = request.pre.user.username;

    if (username && userId) {
        return await dbGetAllLogsByUser(userId);
    } else {
        return Boom.badImplementation('token fail!');
    }

}

export const createLog = async (request, reply) => {

    const { mileage, liters, price } = request.payload;
    const userId = request.pre.user.id;

    return await dbCreateLog({
        mileage: mileage,
        liters: liters,
        price: price,
        userId: userId
    });
}

export const updateLog  = async (request, h) => {
    const { id } = request.params;
    const userId = request.pre.user.id;
    await dbUpdateLog(id, userId, request.payload);
    return await dbGetAllLogsByUser(userId);
}

export const deleteLog  = async (request, h) => {
    const { id } = request.params;
    const userId = request.pre.user.id;
    await dbDeleteLog(id, userId);
    return await dbGetAllLogsByUser(userId);
}