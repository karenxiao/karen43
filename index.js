var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))


// Return a generic Hello World message on root
app.get('/', function (req, res) {
  res.send('Hello World! This is Karen43')
});

/*
	words/avg_len
	Takes a string of text and returns the average length of words in the string
	---
	Only alphanumeric characters will be treated as words 
		- "43" will be treated as a word of length 2
		- "i.e." will be treated as a word of length 2
	Throws a 400 error for invalid requests such as 
		- string that is empty
		- string of whitespaces
		- string of non-alphanumeric characters
*/
app.post('/words/avg_len', function (req, res) {

	txt = req.body.text

	// return an error message for empty strings
	if (txt.length == 0) {
		res.status(400).send("Error: cannot return average word length of an empty string");
	}

	// return an error message for strings of non-alphanumeric characters
	if (txt.replace(/[^\w]/g, "").split("").length == 0) {
		res.status(400).send("Error: cannot return average word length of a non-alphanumeric string");
	}

	// strip out non-alphanumeric characters
	txt = txt.replace(/[^\w\s]/g, "")

	numChars = txt.replace(/[\s]/g, "").split("").length
    numWords = txt.split(" ").length

    if (numWords <= 0) {
    	avgLen = numChars
    }
    else {
    	avgLen = numChars / numWords
    }

    result = {"result": avgLen}
  	res.send(result)
});

/*
	words/most_com
	Takes a string of text and returns the most common word in the string
	---
	Only alphanumeric characters will be treated as words 
	Words are non-case sensitive
		- mark and Mark are treated as the same word
	Throws a 400 error for invalid requests such as 
		- string that is empty
		- string of whitespaces
		- string of non-alphanumeric characters
	Known issues
		- Does not yet break ties alphabetically
*/
app.post('/words/most_com', function (req, res) {
	txt = req.body.text

	// return an error message for empty strings
	if (txt.length == 0) {
		res.status(400).send("Error: cannot return average word length of an empty string");
	}

	// return an error message for strings of non-alphanumeric characters
	if (txt.replace(/[^\w]/g, "").split("").length == 0) {
		res.status(400).send("Error: cannot return average word length of a non-alphanumeric string");
	}

	// strip out non-alphanumeric characters, convert to lowercase, tokenize
	txt = txt.replace(/[^\w\s]/g, "")
	txt = txt.toLowerCase()
	txt = txt.split(" ")

	wordCounts = {}
	maxCount = 1
	mostCommonWord = txt[0]

	for (i in txt) {

		word = txt[i]

		if (wordCounts[word] == null) {
			wordCounts[word] = 1
		}
		else {
			wordCounts[word]++
		}
		
		if (wordCounts[word] >= maxCount) {
			maxCount = wordCounts[word]
			mostCommonWord = word
		}
	}

	result = {"result": mostCommonWord}
	res.send(result)
});

/*
	words/median
	Find the word(s) with the median frequency in the corpus
*/
app.post('/words/median', function (req, res) {
	// TODO
	res.send("Coming soon")
});


/*
	sentences/avg_len
	Takes a string of text and returns the average length of sentences 
	---
	For sake of time, assume sentences end with 
		- a period (.)
		- a single exclamation point (!)
		- a single question mark (?)
		- sadly, extreme displays of excitement cannot be captured!!!!
	Throws a 400 error for invalid requests such as 
		- string that is empty
		- string of whitespaces
		- string of non-alphanumeric characters
	Known issues
		- Periods used for abbreviation will be treated as the end of sentence
		(for example, "Mr. Mark" will be treated as two sentences)
*/
app.post('/sentences/avg_len', function (req, res) {
  	txt = req.body.text

	// return an error message for empty strings
	if (txt.length == 0) {
		res.status(400).send("Error: cannot return average word length of an empty string");
	}

	// return an error message for strings of non-alphanumeric characters
	if (txt.replace(/[^\w]/g, "").split("").length == 0) {
		res.status(400).send("Error: cannot return average word length of a non-alphanumeric string");
	}

	numWords = txt.replace(/[^\w\s]/g, "").split(" ").length
	numSentences = txt.split(/[\\.!\?]/).length - 1

	if (numSentences <= 0) {
		avgLen = numWords
	}
	else {
		avgLen = numWords / numSentences
	}
	
	result = {"result": avgLen}
	res.send(result)
});


/*
	phones
	Find all phone numbers
*/
app.post('/phones', function (req, res) {
	// TODO
	res.send("Coming soon")
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
});

