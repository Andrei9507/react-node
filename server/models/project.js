const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectScheema = new Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('Project', projectScheema);