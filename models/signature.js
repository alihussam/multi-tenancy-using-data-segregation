const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
    name: String,
    comment: String,
});

module.exports = signatureSchema;