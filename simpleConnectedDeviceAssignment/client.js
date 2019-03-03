const {request} = require("http");
//configures the request, telling Node what server to talk to, what path to request from that server, and which method to use
let requestStream = request({
  hostname: "eloquentjavascript.net",
  path: "/20_node.html",
  method: "GET",
  headers: {Accept: "text/html"}
}, response => {  //function that should be called when a response comes in
  console.log("Server responded with status code",
              response.statusCode);
});
requestStream.end();
