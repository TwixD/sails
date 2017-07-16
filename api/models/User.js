/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name:{
      type: 'string',
      size: 20
    },
    username:{
      type: 'string',
      required: true,
      unique: true,
      size: 20
    },
    password:{
      type: 'string',
      required: true,
      size: 20
    },
    identification:{
      type: 'string'
    },
    email:{
      type: 'email',
      required: true,
      unique: true
    }

  },
  
  beforeCreate: (values,next) => {
    // Gen password hash
    if(values.password){
      const saltRounds = 10;
      bcrypt.hash(values.password, saltRounds).then(function(hash) {
          // Store hash in your password DB. 
          values.password = hash;
          next();
      });
    }
  }

};

