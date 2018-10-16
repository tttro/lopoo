import bcrypt from 'bcryptjs';
import config from './utils/config';

export const hashPassword = password =>
  new Promise((resolve, reject) => 
    bcrypt.genSalt(config.saltRounds, (saltErr, salt) => {
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
    })
  );

export const comparePasswords = (passwordAttempt, password) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(passwordAttempt, password, (err, isValid) => {
      if (!err && isValid) {
        resolve(true);
      } else {
        reject(false);
      }
    })
  );

