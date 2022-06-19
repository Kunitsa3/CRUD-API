const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  output: { filename: 'main.js', path: path.resolve(__dirname, 'dist') },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' },
      },
    ],
  },
};

