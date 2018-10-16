export default {
    server: {
        host: 'localhost',
        port: 8080 // env.process.PORT
    },
    auth: {
        secret: 'really_secret_key', // env.process.SECRET
        saltRounds: 10,
        options: {
            algorithms: [ 'HS256' ],
            expiresIn: "24h"
        }
    }
}