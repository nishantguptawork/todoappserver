/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        taskId : {
            type: 'string',
            unique: true,
            primaryKey: true
        },
        description: {
            type: 'string',
            maxLength: 100
        },
        completed: {
            type: 'boolean',
            defaultsTo : false
        },
        dueDate: {
            type: 'datetime',
            // required: true
        },
        hasToDo: {
            model: 'user'
        },
        comments: {
            collection: 'Comment',
            via: 'has'
        }

  }
};

