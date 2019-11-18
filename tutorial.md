# Getting startet with node.js
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
If you cloned my repository (https://gitlab.tandashi.de/DHBW/nodejs-eportfolio.git) you will find an `app_task.js` file inside the `api_example` directory.  
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
});
```

