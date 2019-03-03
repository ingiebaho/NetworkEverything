const {createServer} = require("http");
let server = createServer((request, response) => {    //called everytime a client connects to server 
  response.writeHead(200, {"Content-Type": "text/html"}); //response headers
  //actual message being sent, I want to put data here from the humidity sensor
  response.write(`
    <h1>Hello!</h1>     
    <p>You asked for <code>${request.url}</code></p>`);
  response.end();   //signals end of response 
});
server.listen(8000);
console.log("Listening! (port 8000)");
