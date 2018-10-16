import Knex from '../knex';

export const dbCreateUser = ({ username, password }) => 

     Knex.transaction(async trx => {
        const user = await trx('users')
        .insert({
            username: username
        })
        .returning('*')
        .then(results => results[0]);

        await trx('secrets').insert({
            user_id: user.user_id,
            password: password
        });

        return user;
    })
