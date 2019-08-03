const path = require('path')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  /** Target node to exclude native node libraries */
  target: 'node',
  module: {
    rules: [
      {
        /** .ts and .tsx */
        test: /\.tsx?$/,
        use: 'ts-loader',
        /** Exclude third-party libraries */
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    /** Export functions so that the bundle can be used as a module */
    libraryTarget: 'commonjs',
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}