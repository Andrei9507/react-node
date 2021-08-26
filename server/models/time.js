const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const timeScheema = new Schema({
    amount: Number,
    description: String,
    projectId: String
})

module.exports = mongoose.model('Time', timeScheema);