var pg = require('pg');

export default function(app) {
  app.get('/db', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err) {
      if(err) {
        res.status(500).send("Can't connect to database");
      }
      else {
        res.send('Connected to database');
      }
    });
  });
}

// function(err, client, done)


// client.query('SELECT * FROM test_table', function(err2, result) {
//   done();
//   if (err) {
//     console.error(err);
//     response.send("Error " + err);
//   }        else {
//     response.render('pages/db', {results: result.rows} );
//   }
// });
