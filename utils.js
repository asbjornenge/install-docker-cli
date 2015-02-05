var fs   = require('fs')
var path = require('path')

var utils = {

    archMap : {
        'x64'  : 'x86_64',
        'ia32' : 'i386'
    },

    platformMap : {
        'linux'  : 'Linux',
        'darwin' : 'Darwin'
    },

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
        } catch(e) {
//            console.log(e)
        }
        return {
            version     : version,
            installPath : installPath 
        }
    },

    validatePlatform : function() {
        var valid = true
        var msg;
        if (!utils.archMap[process.arch])         { valid = false; msg = 'Unsupported architecture '+process.arch }
        if (!utils.platformMap[process.platform]) { valid = false; msg = 'Unsupported platform '+process.platform }
        if (!valid) { console.error('Error:',msg); process.exit(1) }
    },

    getDockerCliUrl : function(version) {
        return 'https://get.docker.com/builds/'+utils.platformMap[process.platform]+'/'+utils.archMap[process.arch]+'/docker-'+version
    }

}

module.exports = utils
