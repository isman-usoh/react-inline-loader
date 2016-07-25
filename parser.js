var path = require("path");
var loaderUtils = require("loader-utils");
var SourceNode = require("source-map").SourceNode;
var extractor = require("react-inline/extractor");

module.exports = function (content) {
    this.cacheable();
    var cb = this.async();
    var options = this.options.reactInline || {};
    options.filename = path.parse(this.resourcePath).name;
    delete options.loaders;
    var riRequest = loaderUtils.getRemainingRequest(this);
    var request = loaderUtils.getCurrentRequest(this);
    var output = {
        css: {},
        code: {}
    };

    var result = extractor.transform(content, options);

    output = { css: result.css, code: result.code };

    for (var type in output) {
        var sourceNodes = output[type];
        output[type] = new SourceNode(1, 1, riRequest, sourceNodes).toStringWithSourceMap({
            file: request
        })
    }

    cb(null, "module.exports = " + JSON.stringify(output));
}