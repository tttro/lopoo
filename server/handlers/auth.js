import Knex from '../knex';
import Boom from 'boom';
import { comparePasswords, hashPassword, createToken } from '../utils/auth';
import { dbCreateUser } from '../models/users';

export const verifyCredentials = (request, res) => {
    const { username, password} = request.payload;

    return Knex('users')
    .first()
    .where('username', username.toLowerCase().trim())
    .leftJoin('secrets', 'users.user_id', 'secrets.user_id')
    .then(user => {
        if (!user) {
            return Boom.unauthorized(`Username ${user.username} not found!`);
        }

        if (!user.password) {
            return Boom.unauthorized(`Password not found for ${user.username}`);
        }

        return comparePasswords(password, user)
    })
    .then(res)
    .catch(err => {
        return Boom.unauthorized('Incorrect password!');
    });
}

export const authenticateUser = (request, res) => {
    // create token
    return {
        token: createToken(request.pre.user)
    };  
}

export const verifyUniqueUser = (request, res) => {
    const { username } = request.payload;
    return Knex('users')
    .first()
    .where('username', username.toLowerCase().trim())
    .then( user => {
        if (user) {
            return Boom.unauthorized('Username taken');
        }

        return request.payload;
    })
}

export const createUser = (request, res) => {
    const { username, password } = request.payload;
        
    return hashPassword(password)
        .then(hashedPassword =>{
            return dbCreateUser({
                username: username,
                password: hashedPassword
            });
    })
    .catch(err =>{
        return Boom.badRequest(err);
    });
}