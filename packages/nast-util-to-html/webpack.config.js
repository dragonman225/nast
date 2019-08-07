const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
    /** [name].js results in smaller "parsed size" than index.js in production mode */
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'report/webpack_bundle_report.html'),
      openAnalyzer: false,
      logLevel: 'silent'
    })
  ]
}