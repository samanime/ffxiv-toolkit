import express from 'express';
import { join } from 'path';
import nodeModuleCompile from './middleware/node-module-compile';
import responseBody from './middleware/response-body';
import Cache from './middleware/cache';

const ROOT = join(__dirname, '../..');
const DIST = join(__dirname, '..');
const CLIENT = join(DIST, 'client');

const PORT = process.env.PORT || 8000;

const app = express();

const cache = new Cache();

//app.use(cache.send);
//app.use(responseBody);

app.get('/favicon.ico', (_, res) => {
  res.sendStatus(204);
});

app.use('/node_modules', nodeModuleCompile(join(ROOT, 'node_modules')));
app.use('/public', express.static(CLIENT));

app.get('*', (req, res, next) => {
  if (/^\/(node_modules|public)/.test(req.path)) {
    next();
  } else {
    res.sendFile(join(ROOT, 'index.html'), () => next());
  }
});

//app.use(cache.capture);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});