/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    userId : {
      type: 'string',
      // unique: true,
      primaryKey: true
      // ,required: true
    },
    access_token : {
      type: 'string'
      // ,unique: true,
    },
    email: {
      type: 'email',
      unique: true
    },
    name: {
      type: 'string'
    },
    contactNumber: {
      type: 'text'
    },
    task: {
      collection: 'task',
      via: 'hasToDo'
    }
  }
};

