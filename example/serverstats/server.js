var SSE = require('../../')
  , express = require('express')
  , app = express();

app.use(express.static(__dirname + '/public'));

var sse = new SSE(app);
sse.on('connection', function(client) {
  var id = setInterval(function() {
	  const usage = process.memoryUsage();
	  console.log(usage);
    client.send(JSON.stringify(usage));
  }, 100);
  console.log('started client interval');
  client.on('close', function() {
    console.log('stopping client interval');
    clearInterval(id);
  })
});

app.listen(8080);
