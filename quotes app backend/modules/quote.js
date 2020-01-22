const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const quoteSchema=new Schema({
  quote:{
      type:String,
      required: true
  },
  author:{
    type:String,
    required: true 
  },
  rate:{
    type:String
  },
  id:{
    type:String,
    required: true 
  }
});

module.exports = quote = mongoose.model('quote', quoteSchema);