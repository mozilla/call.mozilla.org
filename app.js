var express = require("express");
var app = express();
var port = 3101;

app.use(express.static(__dirname));

app.listen(port, function() {
  console.log("Running ( http://localhost:" + port + "/call-congress.html )");
  console.log("Press Ctrl+C to stop");
});
