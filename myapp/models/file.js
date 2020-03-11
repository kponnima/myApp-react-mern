/*
 *  Controller which handles api requests coming from the router.
 *  File API request controller
 */
'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FileSchema = new Schema({
    name: String
},
    {
        collection: 'files'
    }
);

module.exports = mongoose.model('Files', FileSchema);