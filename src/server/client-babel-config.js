const isProduction = process.env.NODE_ENV === 'production';

const isRelativePattern = /^\./;
const splitPathPattern = /^([^\/]+)(?:\/(.*))?$/;

const resolvePath = (sourcePath) => {
  if (!isRelativePattern.test(sourcePath)) {
    const [, packageName, path] = sourcePath.match(splitPathPattern);

    try {
      const packageJson = require(`${packageName}/package.json`);

      return `/node_modules/${packageName}/${path || packageJson.module || packageJson.main}`;
    } catch (_) {
      console.warn(`Unable to read package: ${packageName}. sourcePath=${sourcePath}, path=${path}`);
    }
  }
};

module.exports = {
  sourceMaps: !isProduction && 'inline',
  presets: [['@babel/preset-env', {
    modules: false,
    targets: {
      esmodules: true
    }
  }]],
  plugins: [['babel-plugin-module-resolver', {
    root: ['./src'],
    resolvePath
  }]]
};