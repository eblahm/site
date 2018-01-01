const config = require('./config');
const app = require('./app');
const HOSTNAME = require('os').hostname();

app.listen(config.port, () => {
  console.log(`Server listening at: http://${HOSTNAME}:${config.port}`);
});
