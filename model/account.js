

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
    required : 'Enter surname.'
  },
  surname: {
    type: String,
    required : 'Enter surname.'
  },
  email: {
    type: String,
    required : 'Enter email.'
  },
  role: {
    type: String,
    required : 'Enter email.'
  },
  created:{
      type : Date,
      default : Date.now
  },


}, {versionKey: false});

export var Account = mongoose.model('account', AccountSchema);

