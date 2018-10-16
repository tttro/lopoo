import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from './config';

export const hashPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(config.auth.saltRounds, (saltErr, salt) => {
      if (saltErr) {
        reject(saltErr);
      }

      bcrypt.hash(password, salt, (hashErr, hash) => {
        if (hashErr) {
          reject(hashErr);
        } else {
          resolve(hash);
        }
      });

    });
  });

  export const comparePasswords = (passwordAttempt, user) =>
    new Promise((resolve, reject) =>
      bcrypt.compare(passwordAttempt, user.password, (err, isValid) => {
        if (!err && isValid) {
          resolve(user);
        } else {
          reject();
        }
      })
  );

  // Create token
  export const createToken = (user) => {

      let scope = 'user';

      return jwt.sign({ 
          id: user.user_id, 
          username: user.username, 
          scope: scope 
        }, 
        config.auth.secret, 
        {
          algorithm: config.auth.options.algorithms[0],
          expiresIn: config.auth.options.expiresIn
        });

  } 

  export const authUser = (request, reply) => {
    const bearerRegex = /(Bearer\s+)*(.*)/i;
    const authHeader = request.headers.authorization;
    const token = authHeader.match(bearerRegex)[2];
    const decoded = jwt.decode(token);

    return decoded;
  }


  export const validateJwt = async function (decoded, request) {
  const isValid = decoded.id && decoded.scope;
  return { 
      isValid: isValid 
  };
};