var docker_cli = {

    archMap : {
        'x64'  : 'x86_64',
        'ia32' : 'i386'
    },

    platformMap : {
        'linux'  : 'Linux',
        'darwin' : 'Darwin'
    },

    validateCurrentPlatform : function() {
        var msg;
        if (!docker_cli.archMap[process.arch])         { msg = 'Unsupported architecture '+process.arch }
        if (!docker_cli.platformMap[process.platform]) { msg = 'Unsupported platform '+process.platform }
        return {
            valid    : typeof msg === 'undefined',
            msg      : msg,
            arch     : docker_cli.archMap[process.arch],
            platform : docker_cli.platformMap[process.platform]
        }
    },

    getDockerCliUrl : function(platform, arch, version) {
        return 'https://get.docker.com/builds/'+platform+'/'+arch+'/docker-'+version
    }

}

module.exports = docker_cli
