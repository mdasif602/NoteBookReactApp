const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title:{
        type: String,
        requires: true
    },
    description:{
        type: String,
        requires: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('user', NotesSchema)
