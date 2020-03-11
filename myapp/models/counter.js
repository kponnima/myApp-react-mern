/*
 *  Counter model schema
 */
'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

let CounterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    required: true,
    default: 10000
  }
},
  {
    collection: 'counters'
  }
);

//create model for Counter
export default mongoose.model('counter', CounterSchema);