const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser'); // add this line
app.use(bodyParser.json()); // add this line

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flutter_login'
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Define a route that returns JSON data
app.get('/api/data/manusia', (req, res) => {
  const sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "manusia"';
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    const data = {
      questions: results.map(result => ({
        question: result.question,
        choices: [result.choice1, result.choice2, result.choice3, result.choice4],
        answer: result.answer,
        image: result.image
      }))
    };
    res.json(data);
  });
});


app.get('/api/data/bahan', (req, res) => {
  const sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "bahan"';
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    const data = {
      questions: results.map(result => ({
        question: result.question,
        choices: [result.choice1, result.choice2, result.choice3, result.choice4],
        answer: result.answer,
        image: result.image
      }))
    };
    res.json(data);
  });
});


app.get('/api/data/bumi', (req, res) => {
  const sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "bumi"';
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    const data = {
      questions: results.map(result => ({
        question: result.question,
        choices: [result.choice1, result.choice2, result.choice3, result.choice4],
        answer: result.answer,
        image: result.image
      }))
    };
    res.json(data);
  });
});

app.get('/api/data/sistem', (req, res) => {
  const sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "sistem"';
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    const data = {
      questions: results.map(result => ({
        question: result.question,
        choices: [result.choice1, result.choice2, result.choice3, result.choice4],
        answer: result.answer,
        image: result.image
      }))
    };
    res.json(data);
  });
});



app.get('/api/data/all', (req, res) => {
  const sql = 'SELECT * FROM questions';
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    const data = {
      questions: results.map(result => ({
        question: result.question,
        choices: [result.choice1, result.choice2, result.choice3, result.choice4],
        answer: result.answer,
        id: result.id
      }))
    };
    res.json(data);
  });
});

app.post('/api/data/add', (req, res) => {
  const { question, choice1, choice2, choice3, choice4, answer, category } = req.body;
  const sql = `INSERT INTO questions (question, choice1, choice2, choice3, choice4, answer, category) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [question, choice1, choice2, choice3, choice4, answer, category], (error, result, fields) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    res.sendStatus(201);
  });
});

app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM questions WHERE id = ?';
  console.log(id);
  db.query(sql, id, (error, result, fields) => {
    if (error) {
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});






// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
