var fs   = require('fs')
var path = require('path')

var utils = {

    help : function() {
        var helpText = "USAGE\n    install-docker-cli [VERSION] [PATH]\n\
VERSION (optional)\n\
 -> latest\n\
    1.4.0\n\
    1.3.1\n\
    etc.\n\
PATH (optional)\n\
 -> ./docker-version\n\
    /path/to/install/cli\n\
"
        console.log(helpText)
    },

    displayHelpMaybe : function(args) {
        var needsHelp = false
        if (args.indexOf('-h') >= 0)    needsHelp = true
        if (args.indexOf('--help') >=0) needsHelp = true
        if (needsHelp) { utils.help(); process.exit(0) }
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
