import express from 'express';
import { join } from 'path';
import nodeModuleCompile from './node-module-compile';

const ROOT = join(__dirname, '../..');
const DIST = join(__dirname, '..');
const CLIENT = join(DIST, 'client');

const PORT = process.env.PORT || 8000;

const app = express();

app.use('/node_modules', nodeModuleCompile(join(ROOT, 'node_modules')));
app.use('/public', express.static(CLIENT));

app.get('*', (_, res) => {
  res.sendFile(join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});