const { createServer } = require('http');
const { Server } = require('node-static');

const fileServer = new Server('./dist');

const httpServer = createServer((request, response) => {
  request
    .addListener('end', () => {
      fileServer.serve(request, response);
    })
    .resume();
});

const port = process.env.PORT || 3001;

httpServer.listen(port, () => {
  console.log(`Serving "dist" at http://127.0.0.1:${port}`);
});
