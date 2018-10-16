module.exports = {
    client: 'pg',
    debug: true,  // Enable global debug
    connection: {
        // TODO: move these to env
        host: 'localhost',
        user: '',
        password: '',
        database: 'dbname',
        charset: 'utf8',
    },
    seeds: {
        directory: './seeds'
    }
};