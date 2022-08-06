const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const koalaRouter = require('./routes/koala.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

const koalas = [
  {
      name: 'Scotty',
      age: 4,
      gender: 'M',
      ready: 'true',
      notes: 'Born in Guatemala'
  },
  {
      name: 'Jean',
      age: 5,
      gender: 'F',
      ready: 'true',
      notes: 'Allergic to lots of lava'
  },
  {
      name: 'Ororo',
      age: 7,
      gender: 'F',
      ready: 'false',
      notes: 'Loves listening to Paula (Abdul)'
  },
  {
      name: 'Logan',
      age: 15,
      gender: 'M',
      ready: 'false',
      notes: 'Loves the sauna'
  },
  {
      name: 'Charlie',
      age: 9,
      gender: 'M',
      ready: 'true',
      notes: 'Favorite band is Nirvana'
  },
  {
      name: 'Betsy',
      age: 4,
      gender: 'F',
      ready: 'true',
      notes: 'Has a pet iguana'
  }  
];


// ROUTES
app.use('/koalas', koalaRouter)

app.get('/koalas', (req, res) => {
  res.send(koalas);
})

app.post('/koalas', (req, res) => {
  const koala = req.body;
  console.log(req.body);
  koalas.push(koala);
  res.send(koala);
  // res.sendStatus(201);
})

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});


