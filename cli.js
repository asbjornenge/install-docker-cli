#!/usr/bin/env node
var args  = process.argv.splice(2)
var path  = require('path')
var chpr  = require('child_process')
var dcli  = require('./index')
var utils = require('./cli-utils')

utils.displayHelpMaybe(args)
var meta  = utils.getInstallMeta(args)
var valid = dcli.validateCurrentPlatform()

if (!valid.valid) {
    console.error(valid.msg)
    process.exit(1)
}

require('nugget')(dcli.getDockerCliUrl(valid.platform, valid.arch, meta.version), {
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

