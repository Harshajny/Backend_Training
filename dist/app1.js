"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server = new express();
server.get("/employee", (req, res) => {
    let data = {
        profile: {
            name: "Harsha",
            age: 21,
        },
    };
    console.log(data.profile.name);
    res.status(200).send(data);
});
server.listen(3000, () => {
    console.log("server is running on port 3000");
});
// we need to specify the port and it is where the user will be sending requests to 
//log the request
//http or serve responds to a client using the status code
//to send back some date
//wherever i want ot run my code.. i need a set of dependencies to be specified.
// to simply explain, the http is a library that is present in node which we are importing at the start of the code. 
//whenever we get a request to the port 3000, the request gets send to thh createServe throught the parameters. The paramenters are request and repond . 
// ON recieveing the request we print a hello world along with a writehead 200 to depict that the request sent was successfull.
// on typing on npm init -y a new file package.json gets created in the folder. package.json stores all the data handled by the libraries used by the node package manage(npm)
//major. minor. patch  version format
//intro : in package.json is the name of the echo that we use to call. and the package name is backend.
//const http=require('http'); //importing the libraries using http 
//const server=http.createServer((req,res)=>
// { // whenever a request comes a call back function like this is scheduled to happen
//  console.log(req.url);
// res.writeHead(200); // 200 is the http code to respond that the request is succesfull
// res.end("hello world");
//})
//accepted the request took url and printed to console and responding using a hello world
//server.listen(3000,()=>{
//  console.log("Serv is running on port 3000");
//})
// to ignore any files that we dont want our git to track we create a new file called .gitignore and mention the files to be ignored in it.
//npm install, installs all the dependenices that is mentioned in it.
//server.get("employee",(req,res)=>  as it is writenn" employee.. that is the employee api 
//source map: is a link between js an ts files
// req and res are declared as request and response types. this date type is from express.
// we run package using npx as recommended
// if we dont declare the request and response types.. it will show error in the runtime
// in package.json file some of it is given as dev dependencies as it is not actually required during running it is only required during developement
//# sourceMappingURL=app1.js.map