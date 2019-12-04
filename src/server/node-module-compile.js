import { existsSync } from 'fs';
import { join } from 'path';
import { transformFileSync } from '@babel/core';

const transformOptions = require('./client-babel-config');

export default (nodeModulesDir, pathRoot) => (req, res) => {
  const filePath = join(nodeModulesDir, req.path.replace(pathRoot, ''));

  if (existsSync(filePath)) {
    res.header('Content-Type', 'application/javascript')
      .send(transformFileSync(filePath, transformOptions).code);
  } else {
    res.sendStatus(404).end();
  }
};