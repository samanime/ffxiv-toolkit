const isProduction = process.env.NODE_ENV === 'production';

const isRelativePattern = /^\./;
const splitPathPattern = /^([^\/]+)(?:\/(.*))?$/;
const endsWithExtensionPattern = /\.[a-z0-9]+$/i;

const resolvePath = (sourcePath) => {
  if (!isRelativePattern.test(sourcePath)) {
    const [, packageName, path] = sourcePath.match(splitPathPattern);
    const pathWithExtension = path && (endsWithExtensionPattern.test(path) ? path : `${path}.js`);

    try {
      const packageJson = require(`${packageName}/package.json`);

      return `/node_modules/${packageName}/${pathWithExtension || packageJson.module || packageJson.main || 'index.js'}`;
    } catch (_) {
      console.warn(
        `Unable to read package: ${packageName}.`,
        { sourcePath, path, pathWithExtension}
      );
    }
  } else if (!endsWithExtensionPattern.test(sourcePath)) {
    return `${sourcePath}.js`;
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
  }], '@babel/plugin-proposal-class-properties']
};