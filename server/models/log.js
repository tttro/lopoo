import Knex from '../knex';
import Joi from 'joi';
import Boom from 'boom';

export const dbGetAllLogsByUser = userId => {
    return Knex('logs')
        .select()
        .where('user_id', userId)
        .then(results => results)
}

export const dbDeleteLog = (logId, userId) => {
   return Knex('logs')
    .del()
    .where('log_id', logId)
    .where('user_id', userId);
}

export const dbUpdateLog = (logId, userId, payload) => {
    return Knex('logs')
     .update({
        mileage: payload.mileage,
        liters: payload.liters,
        price: payload.price,     
    })
     .where('log_id', logId)
     .where('user_id', userId);
 }
 
export const dbCreateLog = (payload) => {
    return Knex('logs')
    .insert({
        mileage: payload.mileage,
        liters: payload.liters,
        price: payload.price,
        user_id: payload.userId 
    }).then((res)=>{
        return dbGetAllLogsByUser(payload.userId);
    }).catch((err) => {
        return Boom.badImplementation(err);
    });
}