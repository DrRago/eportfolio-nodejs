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

    /* ############################# */
    /* # these routes should be    # */
    /* # edited                    # */
    /* ############################# */

    /* create the routes */
    app.get('/movie/', callback);
    app.get('/movie/:movieID', callback);
    app.all('/movie/:movieID/set/:newName', callback); // post or put would be optimal, but for simple reasons nah

    /* create listen app */
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* ! helper snippets           ! */
/* ! remove these before       ! /*
/* ! running the app           ! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

/* express functions */

// app.method callbacks (e.g. app.get(route, callback)
// callback function must take at least 2 parameters (req, res)

// send a json response with HTTP code 200:
res.json(json_object); // where res is the express result object

// send a json response with any HTTP code:
res.status(code).send(json_object); // where res is the express result object

// get url parameters (/movie/:movieID)
req.params.paramName; // where req is the express request object

// get query parameters (/movie?movieID=id)
req.query.paramName; // where req is the express request object

/* mongodb collection functions: */

// find all
mongoDBCollection.find().toArray(callback); // toArray takes a callback with (error, results)
// find() can be extended with e.g. limit(): .find().limit(number)

// find one result by id
mongoDBCollection.findOne({_id: mongoID}, callback); // findOne takes a callback as last parameter with (error, result)
// mongoID is a type of mongo.ObjectID
// create it with new mongo.ObjectID(ID_string) where ID_string is e.g. the parameter value

// update one document by id
mongoDBCollection.updateOne({_id: mongoID}, {$set: {key: value}}, callback); // updateOne takes a callback as last parameter with (error, updateInfo)
// updateInfo contains information about the update process. log it in the console to see what's in there ;)
// the $set key has an object as value containing the fields to update, e.g. original_title
