/*
 *  Controller which handles api requests coming from the router.
 *  File API request controller
 */
'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EDISTemplateSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
},
  {
    collection: 'edistemplates'
  }
);

module.exports = mongoose.model('EDISTemplates', EDISTemplateSchema);