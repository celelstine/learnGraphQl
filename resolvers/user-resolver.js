// resolvers/user-resolver.js

import User from '../models/user.model';

/* eslint no-unused-expressions: 0 */

const UserResolver = {
  getById: id => new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      error ? reject(error) : resolve([user]);
    });
  }),
  get: () => new Promise((resolve, reject) => {
    User.find({}, (error, users) => {
      error ? reject(error) : resolve(users);
    });
  }),
  create: (user) => {
    const newUser = new User(user);
    return new Promise((resolve, reject) => {
      newUser.save((error, createdUser) => {
        if (error) reject(error);
        else resolve(createdUser);
      });
    });
  },
};

export default UserResolver;
