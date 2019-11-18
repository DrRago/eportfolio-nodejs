const express = require('express');
const app = express();
const port = 8081;

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

/* mongodDB connection */

/* set static properties */
const mongoUser = 'tinf18';
const mongoPassword = 'tinf18dhbw'; // password in git history, noice
const mongoServer = "drrago.de";
const mongoPort = 21;
const databaseName = "software_eng";

/* the connection string */
const url = `mongodb://${mongoUser}:${mongoPassword}@${mongoServer}:${mongoPort}/?authMechanism=DEFAULT&authSource=${databaseName}`;

let mongoDBCollection; // will hold the db connection

/**
 * Perform the mongo connect and set the database variable
 * @returns {Promise<void>} javascript promise
 */
const mongoConnect = async () => {
    const client = await MongoClient.connect(url);
    mongoDBCollection = client.db(databaseName).collection('movie');
    console.log('Successfully connected to mongo server')
};

/* call the connect function */
mongoConnect().catch(err => {
    /* and catch any error during the server connection */
    console.log("Connection to mongo server failed");
    throw err;
}).then(() => {
    /* connection was created successfully */
    /* start express */

    /* create the routes */
    app.get('/movie/', getAllMoviesRoute);
    app.get('/movie/:movieID', getMovieRoute);
    app.all('/movie/:movieID/set/:newName', updateRoute); // post or put would be optimal, but for simple reasons nah

    /* create listen app */
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});

/* define route functions */

/**
 * this route should return the first 50 movies from the movie collection
 *
 * @param req the express request object
 * @param res the express result object
 */
const getAllMoviesRoute = (req, res) => {
    mongoDBCollection.find().limit(50).toArray((err, movies) => {
        if (err) {
            throw err
        }
        res.json(movies)
    });
};

/**
 * this route should return the movie with the mongo ID passed as a url parameter
 *
 * @param req the express request object
 * @param res the express result object
 */
const getMovieRoute = (req, res) => {
    let status = 200; // the status code to return
    let result; // the result object (either the movie or the error response)
    let mongoID; // the mongo ID of the actually passed parameter

    try {
        /* convert the passed ID to a mongo ID */
        mongoID = new mongo.ObjectID(req.params.movieID);
    } catch (e) {
        /* no proper id passed -> catch exception thrown by 'new mongo.ObjectID()' */
        status = 400;
        result = {error: 400, message: "Invalid movie ID"};
    }

    if (status === 200) {
        /* only request data if the id is valid */
        mongoDBCollection.findOne({_id: mongoID}, (err, movie) => {
            if (err) {
                throw err;
            }
            result = movie;

            if (!result) {
                /* proper id but no movie found */
                status = 404;
                result = {error: 404, message: "Movie not found"};
            }

            /* send the json response with the status code in the 'status' variable */
            res.status(status).send(result)
        });
    }
};

/**
 * this route should update the 'original_title' field of
 * the movie with the ID and the new name passed as parameters
 *
 * @param req the express request object
 * @param res the express result object
 */
const updateRoute = (req, res) => {
    let status = 200; // the status code to return
    let result; // the result object (either the movie or the error response)
    let mongoID; // the mongo ID of the actually passed parameter

    try {
        /* convert the passed ID to a mongo ID */
        mongoID = new mongo.ObjectID(req.params.movieID);
    } catch (e) {
        /* no proper id passed -> catch exception thrown by 'new mongo.ObjectID()' */
        status = 400;
        result = {error: 400, message: "Invalid movie ID"};
    }

    if (status === 200) {
        /* only update data if the id is valid */
        mongoDBCollection.updateOne({_id: mongoID}, {$set: {original_title: req.params.newName}}, (err, updateInfo) => {
            if (err) {
                throw err;
            }
            if (updateInfo.matchedCount === 0) {
                /* no rows were matched -> movie not found */
                status = 404;
                result = {error: 404, message: "Movie not found"};
            } else {
                /* all went fine (may be no modification due to same values, but thats fine) */
                result = {message: "200 OK"}
            }

            /* send the json response with the status code in the 'status' variable */
            res.status(status).send(result)
        });
    }
};

/* make the app available for other modules (that dont exist yet) */
module.exports = app;
