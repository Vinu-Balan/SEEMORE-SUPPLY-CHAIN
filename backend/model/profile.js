var mongoose = require('mongoose');
var Schema = mongoose.Schema;

profileSchema = new Schema( {
    username: String,
	name: String,
    location: String,
    contact: String,
    type:  String,
    bio: String,
}),
profile = mongoose.model('profile', profileSchema);

module.exports = profile;