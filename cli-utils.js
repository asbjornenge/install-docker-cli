var fs   = require('fs')
var path = require('path')

var utils = {

    help : function() {
        console.log('Look ma, Im helping!')
    },

    getInstallMeta : function(args) {
        var version     = args.length > 0 ? args[0] : 'latest'
        var installPath = args.length > 1 ? args[1] : './'
        if (version.indexOf('/') >= 0) { installPath=version; version='latest' }
        try {
            if (fs.lstatSync(path.resolve(installPath)).isDirectory()) {
                var separator = installPath.slice(-1) === '/' ? '' : '/'
                installPath += separator+'docker-'+version
            }
        } catch(e) {}
        return {
            version     : version,
            installPath : installPath 
        }
    }

}

module.exports = utils
