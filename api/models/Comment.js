/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        commentId : {
            type: 'string',
            unique: true,
            primaryKey: true
        },
        commentText : {
            type: 'string',
            maxLength: 100,
            // required: true
        },
        has: {
            model: 'Task'
        }
  }
};

