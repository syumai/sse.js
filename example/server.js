var SSE = require('../')
  , http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const html = `
<script>
	var es = new EventSource("/sse");
	es.onmessage = function (event) {
	  console.log(event.data);
	};
</script>
	  `;
  res.end(html);
});

server.listen(8080, '127.0.0.1', function() {
  var sse = new SSE(server);
  sse.on('connection', function(client) {
    client.send('hi there!');
  });
});

