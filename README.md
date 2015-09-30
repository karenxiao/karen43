## karen43
A Node.js server that handles a few basic requests on words/avg_len, words/most_com, sentences/avg_len
- Running at http://karen43.herokuapp.com
- Built with the Node.js [Express](http://expressjs.com/) framework
- Expects POST requests with a JSON body with a single tag `"text"` such as: `{ "text" : "My cat is gray. It doesn't have feathers." }`
- Returns an error or a JSON response with a single tag `"result"`
- Code is primarily in `index.js` (didn't split into multiple files for now)
- A few sample test cases are in `test.json`

###words/avg_len
Takes a string of text and returns the average length of words in the string

- Only alphanumeric characters will be treated as words 
  - "43" will be treated as a word of length 2
  - "i.e." will be treated as a word of length 2
- Throws a 400 error for invalid requests such as 
  - string that is empty
  - string of whitespaces
  - string of non-alphanumeric characters
	
###words/most_com
Takes a string of text and returns the most common word in the string

- Only alphanumeric characters will be treated as words 
- Words are non-case sensitive
  - mark and Mark are treated as the same word
- Throws a 400 error for invalid requests such as 
  - string that is empty
  - string of whitespaces
  - string of non-alphanumeric characters
- Known issues
  - Does not yet break ties alphabetically

###words/median
Find the word(s) with the median frequency in the corpus
- TODO

###sentences/avg_len
Takes a string of text and returns the average length of sentences 
- For sake of time, assume sentences end with 
	- a period (.)
	- a single exclamation point (!)
	- a single question mark (?)
	- sadly, extreme displays of excitement cannot be captured!!!!
- Throws a 400 error for invalid requests such as 
	- string that is empty
	- string of whitespaces
	- string of non-alphanumeric characters
Known issues
	- Periods used for abbreviation will be treated as the end of sentence
	(for example, "Mr. Mark" will be treated as two sentences)
	
###phones
Find all phone numbers
- TODO
