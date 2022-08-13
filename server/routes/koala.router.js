const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js');

// DB CONNECTION

// GET
koalaRouter.get('/', (req, res) => {
    console.log('In GET /koalas');
    const queryText = 'SELECT * FROM "koala" ORDER BY "id";';
    pool.query(queryText).then((result) => {
        console.log('SELECT SUCCESS!', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /koala', error);
        res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
    const koala = req.body;
    const queryText = `INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes")
                       VALUES ($1, $2, $3, $4, $5);`
    pool.query(queryText, [koala.name, koala.gender, koala.age, koala.ready_to_transfer, koala.notes])
        .then((results) => {
            console.log(results);
            res.send(results);
        }).catch((error) => {
            console.log('Error in the POST /koala', error);
            res.sendStatus(500);
        });
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    const koalaId = req.params.id;
    const queryText = `UPDATE "koala"
                       SET "ready_to_transfer" = 'Y'
                       WHERE "id" = $1;`;
    pool.query(queryText, [koalaId]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in PUT koala', error);
        res.sendStatus(500);
    });
});

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM "koala" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id]).then((result) => {
        res.send(200);
    }).catch((error) => {
        console.log('ERROR in DELETE', error);
        res.sendStatus(500);
    });
})

module.exports = koalaRouter;