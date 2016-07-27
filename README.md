# react-inline-loader
This package provides loader for Webpack which extracts static [react-inline](https://github.com/martinandert/react-inline) declarations into a separate CSS bundle.

## Install
```
npm install react-inline-loader
```


## Usage

App:

``` jsx
// app.jsx
import React from 'react';
import StyleSheet from 'react-inline';

const styles = StyleSheet.create({
  header: {
    fontSize: '18px',
    color: "red"
  },
  subheader: {
    fontSize: '16px',
    color: "blue"
  }
});

class App extends React.Component {
  render() {
    return <div>
        <h1 className={styles.header}>Hello world!</h1>
        <h2 className={styles.subheader}>React.Js</h2>
      </div>;
  }
}
```

Config Webpack:

``` js
// webpack.config.js
module.exports = {
  entry: "./app.jsx",
  output: {
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "react-inline-loader" },
    ]
  },
  babel: { // babel config
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
  reactInline: { // react-inline config
    vendorPrefixes: false,
    compressClassNames: false,
    loaders: {
      css: ExtractTextPlugin.extract("style-loader", "css-loader"),
      code: "ts-loader"
    }
  },
  ts: { // typescript config
  }
}
```

## Changelog

### 0.1.1
###### _July 25, 2016_
- fix unknow style name



## License

[MIT](http://opensource.org/licenses/MIT)