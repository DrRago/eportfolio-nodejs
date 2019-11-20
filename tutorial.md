# Getting startet with node.js ~ Leonhard Gahr
## Installation
### node.js
You will have to install node.js on your system. A full installation guide for any system is already provided by the Node.js Foundation. [Check it out!](https://nodejs.org/en/download/package-manager/)  
### npm
npm is the default package manager for node.js. It is recommended to use that package manager if you are just starting using node.js. It is installed with node.js so you actually don't have to worry about anything here.
### mongodb (optional)
You may install mongodb on your system to use your own database for the task or the future. There is an existing tutorial for this provided by the MongoDB inc. [Check it out!](https://docs.mongodb.com/manual/installation/)  

## The node.js module

### Run an existing module
To get started with your first node.js app you can simply follow these steps:

1. clone or download my nodejs-eportfolio repository (https://gitlab.tandashi.de/DHBW/nodejs-eportfolio.git)
2. navigate into that directory using a CLI and go into the directory `api-example`
3. verify the existence of the `package.json` file and make sure the file that is stated as the value of `main` exists
4. type `npm install` into the console and wait for the installation to finish
5. start the module using either `node [path to js file]` or with the `nodemon` module (you will need to install `nodemon` first: `npm i -g nodemon`)
6. check out the routes I mentioned in the task description (`/movie/`, `/movie/:movieID`, `/movie/:movieID/set/:newName`)

If you encounter any issue following these steps don't hesitate to ask google ;) or me  

### Create your own module
If you cloned my repository (https://gitlab.tandashi.de/DHBW/nodejs-eportfolio.git) you will find an `app_task.js` file inside the `api_example` directory. If not, you can just create a js file called the same as it says in the `package.json` under `main`.  
This file is just a little template for you to get started with your own custom module, you may use that script or create your own.  
**Remember: you should always keep your `package.json` up-to-date. So change the `main` field if you choose to change the name of you starting script.** 
#### Connect to the mongo database
To connect to a mongo database there are many modules available. I chose to use the `mongodb`. To create the connection you have to enter in the file:
```javascript
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

mongoConnect().then(() => {
    // this function will be called when the connection was made successfully
    // the mongoDBCollection variable is available here
});
```
The `const` variables set at the top determine some configuration. You may change them if you got an own mongodb server, otherwise these credentials will work.  

##### Perform actions on a collection
A collection is basically a *table* but not exactly since mongodb is a NO-SQL database, meaning you are not stuck to a strict structure of your collections (*tables*). This can be good or bad.  
You should inform yourself about the commands possible on a mongo db, but here are some examples:
```javascript
mongoDBCollection.find().toArray((err, movies) => "do smth"); // movies contains ALL entries of the collection
mongoDBCollection.find().limit(50).toArray((err, movies) => "do smth"); // movies contains the first 50 entries of the collection

// update one exact entry
mongoDBCollection.updateOne({original_title: "Bruce Wayne"}, {$set: {original_title: "Batman"}}, (err, updateInfo) => "do smth");
```
Since there are plenty of documentations about this on the web I won't mention more possibilities here. Feel free to google or ask me if you want to know something specific.

#### Add express routes
In most use-cases of node.js you will implement some kind of api, so you require the module to run as a webservice. Express is a package for any node.js module allowing you to easily create that service and handle the routes.  
You need to append this code to the beginning of your js file:
```javascript
const express = require('express');
const app = express();
const port = 8081;
```
These lines create an app. This app is your main express object, you can add routes on it and start / stop the service.  
To start the service you have to tell the app on which port it should listen:
````javascript
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
````
The callback is called if the app is listening on that port.  
You can create the routes you wanna listen for before or after starting the service. To create a route use:
```javascript
app.{HTTP_METHOD}('{route}', callback);
// e.g.
app.get('/movie/', (req, res) => res.status({http_status}).send({some: data} | "or just a string"));
```
Inside the callback of the route you may implement your logic to return data or just a status code to the requester.  
After implementing something you can start your server using the method described above.  

**Did you know (probably not):** nodemon listens for changes in your sources and automatically restarts the server if it detects changes. Quite useful when you fix really small issues.
