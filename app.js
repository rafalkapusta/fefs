const http = require("http");

http.createServer((req,res) => {
	res.write("response!");
	res.end();
	}
).listen(3000);

console.log("Server listening on port 3000");
