var path = require("path");
var assign = require("object-assign");
var loaderUtils = require("loader-utils");

module.exports = function (content) {
    var defaultLoaders = {
        css: "style-loader!css-loader?sourceMap",
        code: "babel-loader"
    };
    this.cacheable();
    var options = this.options.reactInline || {};
    var query = loaderUtils.parseQuery(this.query);
    var loaders = assign({}, defaultLoaders, options.loaders);

    var cb = this.async();
    var output = "";
    var url = loaderUtils.getRemainingRequest(this);
    


    function getLoader(type) {
        var loader = loaders[type] !== undefined ? loaders[type] : defaultLoaders[type];
        return loader ? loader + "!" : "";
    }

    var me = this;
    function getRequire(type) {
        return "require(" + loaderUtils.stringifyRequest(me, "-!" + getLoader(type) + require.resolve("./selector.js") + "?" + type + "!" + url) + ")";
    }

    var me = this;
    var parserUrl = "!!" + require.resolve("./parser.js") + "!" + url;
    this.loadModule(parserUrl, function (err, source, map, module) {
        if (err) return cb(err);

        var parts = me.exec(source, parserUrl);

        if (parts.css)
            output += getRequire("css") + "\n";

        if (parts.code)
            output += "module.exports = " + getRequire("code") + "\n";

        cb(null, output);
    })
};
module.exports.withLoaders = function (opts) {
    return "react-inline-loader?" + JSON.stringify(opts).replace(/!/g, "\\u0021")
}