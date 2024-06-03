var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;

    // Serve index.html if the root URL is requested
    if (filename === "./") {
      filename = "./index.html";
    } else if (!filename.endsWith(".html")) {
      filename += ".html";
    }

    fs.readFile(filename, (err, data) => {
      if (err) {
        console.error(err);
        fs.readFile("./404.html", (err404, data404) => {
          if (err404) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end(data404);
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(4200);
