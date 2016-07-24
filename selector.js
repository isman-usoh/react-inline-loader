
module.exports = function () {
    this.cacheable();
    var cb = this.async();
    var type = this.query.substr(1);
    var me = this;
    var url = "!!" + require.resolve("./parser.js") + "!" + this.resource;

    this.loadModule(url, function (err, source) {
        if (err) return cb(err);
        var parts = me.exec(source, url);
        var part = parts[type];
        
        cb(null, part.code, part.map);
    });
}