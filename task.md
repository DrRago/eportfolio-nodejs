# Simple API
## Description
The task is to create a little RESTful API in node.js. The API should meet the following requirements:

| Route | Method | Description |
| ----- | ------ | ----------- |
| /movie/| GET | Get the first 50 movies of the database|
| /movie/:movieID| GET | Get the movie with the ID provided or an useful error message|
| /movie/:movieID/set/:newName| (PUT) [may be GET, it's easier to test] | update the name of one movie and return a useful response (error and success)|

As you can see you shall use a database to get the data. There is a mongodb instance running on `drrago.de:21`, with the name `software_eng` and the credentials:  
`username`: `tinf18`  
`password`: `tinf18dhbw`  
The database contains the collection `movie` with many movie entries. Have fun :)  
(There is also a collection named `person`, you can play around with that if you want)

## Prerequisites
* installed node.js
* installed package manager providing express and mongodb 
* the `app_task.js` file (in this repository in api-example)
* an editor
* internet connection

## Result
You can test the your API by simply open the browser page with localhost and the port you entered on top of your `app.js` file.  

## Any Questions?
I am happy to help you with any question you may have regarding node.js. I am developing with node.js since a few years ;)  
Also on StackOverflow there are many many many intelligent node.js developers.
