"use strict";

var express = require('express');

var app = express();

var mysql = require('mysql');

var bodyParser = require('body-parser'); // add this line


app.use(bodyParser.json()); // add this line

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flutter_login'
}); // Connect to database

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to database');
}); // Define a route that returns JSON data

app.get('/api/data/manusia', function (req, res) {
  var sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "manusia"';
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    var data = {
      questions: results.map(function (result) {
        return {
          question: result.question,
          choices: [result.choice1, result.choice2, result.choice3, result.choice4],
          answer: result.answer,
          image: result.image
        };
      })
    };
    res.json(data);
  });
});
app.get('/api/data/bahan', function (req, res) {
  var sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "bahan"';
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    var data = {
      questions: results.map(function (result) {
        return {
          question: result.question,
          choices: [result.choice1, result.choice2, result.choice3, result.choice4],
          answer: result.answer,
          image: result.image
        };
      })
    };
    res.json(data);
  });
});
app.get('/api/data/bumi', function (req, res) {
  var sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "bumi"';
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    var data = {
      questions: results.map(function (result) {
        return {
          question: result.question,
          choices: [result.choice1, result.choice2, result.choice3, result.choice4],
          answer: result.answer,
          image: result.image
        };
      })
    };
    res.json(data);
  });
});
app.get('/api/data/sistem', function (req, res) {
  var sql = 'SELECT question, choice1, choice2, choice3, choice4, answer, image FROM questions WHERE category = "sistem"';
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    var data = {
      questions: results.map(function (result) {
        return {
          question: result.question,
          choices: [result.choice1, result.choice2, result.choice3, result.choice4],
          answer: result.answer,
          image: result.image
        };
      })
    };
    res.json(data);
  });
});
app.get('/api/data/all', function (req, res) {
  var sql = 'SELECT * FROM questions';
  db.query(sql, function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    var data = {
      questions: results.map(function (result) {
        return {
          question: result.question,
          choices: [result.choice1, result.choice2, result.choice3, result.choice4],
          answer: result.answer,
          id: result.id
        };
      })
    };
    res.json(data);
  });
});
app.post('/api/data/add', function (req, res) {
  var _req$body = req.body,
      question = _req$body.question,
      choice1 = _req$body.choice1,
      choice2 = _req$body.choice2,
      choice3 = _req$body.choice3,
      choice4 = _req$body.choice4,
      answer = _req$body.answer,
      category = _req$body.category;
  var sql = "INSERT INTO questions (question, choice1, choice2, choice3, choice4, answer, category) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [question, choice1, choice2, choice3, choice4, answer, category], function (error, result, fields) {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    res.sendStatus(201);
  });
});
app["delete"]('/api/questions/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM questions WHERE id = ?';
  console.log(id);
  db.query(sql, id, function (error, result, fields) {
    if (error) {
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
}); // Start the server

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("Server listening on port ".concat(port));
});