var args  = process.argv.splice(2)
var path  = require('path')
var chpr  = require('child_process')
var utils = require('./utils')
var meta  = utils.getInstallMeta(args)

utils.validatePlatform()

require('nugget')(utils.getDockerCliUrl(meta.version), {
    target  : meta.installPath,
    verbose : true
}, function(err) {
    if (err) { console.error('Error:',err.message); process.exit(1) }
    var child = chpr.exec('chmod +x '+meta.installPath)
    child.stdout.on('data', function(data) { console.log(data)   })
    child.stderr.on('data', function(data) { console.error(data) })
    child.on('close', function() {
        console.log('Installed docker-'+meta.version+' to '+path.resolve(meta.installPath))
        process.exit(0)
    })
})

