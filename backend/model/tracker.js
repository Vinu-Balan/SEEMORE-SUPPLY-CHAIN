var mongoose = require('mongoose');
var Schema = mongoose.Schema;

trackerSchema = new Schema( {
    pack_id: Number,
    dist_id: String,
    man_id: String,
    ret_id: String,
    req_date: String,
    req_time: String,
    source: String,
    dest: String,
    contact: String
}),
tracker = mongoose.model('tracker', trackerSchema);

module.exports = tracker;