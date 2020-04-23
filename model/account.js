

export var mongoose = require('mongoose');

export var Schema = mongoose.Schema;
export var AccountSchema = new Schema({
  username: {
      type: String,
      required : 'Enter name.'
  },
  password: {
    type: String,
    required : 'Enter password.'
},
  email: {
    type: String,
    required : 'Enter email.'
  },
  name: {
    type: String,
  
  },
  surname: {
    type: String,

  },
  birthdate: {
    type: Date,

  },
  role: {
    type: String,
    required : 'Enter role.'
  },
  created:{
      type : Date,
      default : Date.now
  },


}, {versionKey: false})

export var TokenSchema = new Schema({
    token : {
      type: String,
      required : 'Enter a Token'
    }

})

export var Account = mongoose.model('account', AccountSchema);
export var Token = mongoose.model('token', TokenSchema);

