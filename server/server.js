const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const koalaRouter = require('./routes/koala.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

const koalas = [
  {
      id: 1,
      name: 'Scotty',
      gender: 'M',
      age: 4,
      ready: 'Yes',
      notes: 'Born in Guatemala'
  },
  {
      id: 2,
      name: 'Jean',
      gender: 'F',
      age: 5,
      ready: 'Yes',
      notes: 'Allergic to lots of lava'
  },
  {
      id: 3,
      name: 'Ororo',
      gender: 'F',
      age: 7,
      ready: 'No',
      notes: 'Loves listening to Paula (Abdul)'
  },
  {
      id: 4,
      name: 'Logan',
      gender: 'M',
      age: 15,
      ready: 'No',
      notes: 'Loves the sauna'
  },
  {
      id: 5,
      name: 'Charlie',
      gender: 'M',
      age: 9,
      ready: 'Yes',
      notes: 'Favorite band is Nirvana'
  },
  {
      id: 6,
      name: 'Betsy',
      gender: 'F',
      age: 4,
      ready: 'Yes',
      notes: 'Has a pet iguana'
  }  
];


// ROUTES
app.use('/koalas', koalaRouter)

app.post('/koala', (req, res) => {
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
