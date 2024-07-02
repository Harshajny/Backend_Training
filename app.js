const http=require('http'); //importing the libraries using http 

const server=http.createServer((req,res)=>
{ // whenever a request comes a call back function like this is scheduled to happen
    console.log(req.url);
    res.writeHead(200); // 200 is the http code to respond that the request is succesfull
    res.end("hello world");
})
//accepted the request took url and printed to console and responding using a hello world
server.listen(3000,()=>{
    console.log("Serv is running on port 3000");
})
// we need to specify the port and it is where the user will be sending requests to 
//log the request
//http or serve responds to a client using the status code
//to send back some date



// to simply explain, the http is a library that is present in node which we are importing at the start of the code. 
//whenever we get a request to the port 3000, the request gets send to thh createServe throught the parameters. The paramenters are request and repond . 
// ON recieveing the request we print a hello world along with a writehead 200 to depict that the request sent was successfull.