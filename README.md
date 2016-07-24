# react-inline-loader
This package provides loader for Webpack which extracts static react-inline declarations into a separate CSS bundle.

## Install
```
npm install react-inline react-inline-loader
```


## Usage

Config Webpack:

``` js
// webpack.config.js
module.exports = {
  entry: "./main.jsx",
  output: {
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "react-inline-loader" },
    ]
  }
}
```


## Loader configuration

[React Inline Option](https://github.com/martinandert/react-inline#usage)

For example, to extract out the generated css into a separate file and support Typescript,
use this configuration :

``` js
// webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./main.tsx",
  output: {
    filename: "build.js"
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/, loader: "react-inline-loader"
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ],
  reactInline: {
    vendorPrefixes: false,
    minify: false,
    compressClassNames: false,
    loaders: {
      css: ExtractTextPlugin.extract("style-loader!css-loader"),
      code: "ts-loader"
    }
  }
}
```

## License

[MIT](http://opensource.org/licenses/MIT)