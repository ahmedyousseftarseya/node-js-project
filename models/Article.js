const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// like migration in laravel
const articleSchema = new Schema({
	title: String,
	body: String,
	number_of_likes: Number
});


// like eloquent model in laravel
const Article = mongoose.model("Article", articleSchema);

// export for can import in any other file like controller
module.exports = Article;