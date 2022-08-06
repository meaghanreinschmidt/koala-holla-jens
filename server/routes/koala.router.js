const express = require('express');
const koalaRouter = express.Router();

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

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    res.send(koalas);
})

// POST
koalaRouter.post('/', (req, res) => {
    const koala = req.body;
    console.log(req.body);
    koalas.push(koala);
    res.send(koala);
    // res.sendStatus(201);
  })

// PUT


// DELETE

module.exports = koalaRouter;