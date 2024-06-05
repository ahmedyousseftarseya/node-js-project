// import express from "express"; // ES synatx fore modules
const express = require("express");   // common JS syntax
const mongoose = require("mongoose");

const app = express();

// import Article
const Article = require("./models/Article");
const jsonResponse = require("./helper");

// connect to db 
mongoose.connect("mongodb+srv://admin:admin@my-first-project.qxhhfmh.mongodb.net/?retryWrites=true&w=majority&appName=my-first-project")
	.then(() => {
		console.log("Connected Sucessfully");

		app.listen(3000, () => {
			console.log("I am listening in port 3000...")
		});

	}).catch((error) => {
		console.log("Connection error " + error);
	});

app.use(express.json()); // for can access request body

app.get('/', (req, res) => {
	res.status(200).send("tes");
});

app.post('/test', (req, res) => {
	res.json({
		name: req.body.name
	});
	// res.status(200).send("post request");
});

app.get('/findsum/:num1/:num2', (req, res) => {  // get path params
	const num1 = req.params.num1;
	const num2 = req.params.num2;

	const total = Number(num1) + Number(num2);
	res.send(`The total is ${total}`);
});

app.post('/findsum2', (req, res) => {  // get body params  
	const num1 = req.body.num1;
	const num2 = req.body.num2;

	const total = Number(num1) + Number(num2);
	res.send(`The total is ${total}`);
});

app.post('/findsum3', (req, res) => {  // get query string params  
	const num1 = req.query.num1;
	const num2 = req.query.num2;

	const total = Number(num1) + Number(num2);
	res.send(`The total is ${total}`);
});


app.get('/numbers', (req, res) => {
	const name = "Ahmed Youssef";
	arr = [1, 4, 9, 8];
	numbers = sum(arr);
	console.log(numbers);

	// res.sendStatus(200).send(numbers);
	// res.sendFile(__dirname + "/views/numbers.html");
	res.render("numbers.ejs", {
		name: name,
		sum: numbers
	});
});


function sum(arr) {
	if (arr.length == 0)
		return null;
	return arr[0] + sum(arr.slice(1));
}


//================= Articles Endpoints ==================

app.post("/articles", async (req, res) => {
	const article = new Article();

	article.title = req.body.title;
	article.body = req.body.body;
	article.number_of_likes = 0;
	await article.save()

	res.json(jsonResponse(200, article, "article created"));
});


app.get("/articles", async (req, res) => {
	const articles = await Article.find();

	res.json(jsonResponse(200, articles, await Article.countDocuments()));
});

app.get("/articles/:id", async (req, res) => {
	const id = req.params.id;

	// Validate the ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json(jsonResponse(400, null, "Invalid article ID"));
	}

	let article;
	try {
		article = await Article.findById(id);
		if(! article) {
			return res.status(404).json(jsonResponse(404, null, "Article not found"));
		}
	} catch (error) {
		console.log("Error: " + error);
		return res.json("Error: " + error);
	}

	res.json(jsonResponse(200, article));
});


app.delete("/articles/:id", async (req, res) => {
	const id = req.params.id;

	// Validate the ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json(jsonResponse(400, null, "Invalid article ID"));
	}
	try {
		let article = await Article.findByIdAndDelete(id);
		if(! article) {
			return res.status(404).json(jsonResponse(404, null, "Article not found"));
		}
	} catch (error) {
		console.log("Error: " + error);
	}

	res.json(jsonResponse(200, null, "Article deleted"));
});


app.get("/showarticles", async (req, res) => {
	const articles = await Article.find();

	return res.render("articles.ejs", {
		articles: articles
	})
});



// function jsonResponse(status, data = null, message = null) {
// 	return {
// 		status: status,
// 		data: data,
// 		message
// 	}
// }


// list server to port 3000
// app.listen(3000, () => {
// 	console.log("I am listening in port 3000...")
// });