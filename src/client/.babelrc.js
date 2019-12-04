const isProduction = process.env.NODE_ENV === 'production';

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
    resolvePath: require('../server/babel-resolve-path')
  }]]
};