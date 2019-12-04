const isNodeModulePattern = /^\./;
const splitPathPattern = /^([^\/]+)(?:\/(.*))?$/;

module.exports = (sourcePath, file) => {
  if (isNodeModulePattern.test(sourcePath)) {
    return undefined;
  }

  const [, packageName, path] = sourcePath.match(splitPathPattern);

  try {
    const packageJson = require(`${packageName}/package.json`);

    return `/node_modules/${packageName}/${path || packageJson.module || packageJson.main}`;
  } catch (_) {
    return undefined;
  }
};