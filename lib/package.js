'use strict'

module.exports = function packageIn ($void) {
  var $ = $void.$
  var loader = $void.loader

  var $package = Object.create(null)

  $package.create = function create (appSpace) {
    var $path = $void.$path
    var appHome = appSpace.local['-app-home']

    var packages = Object.create(null)
    var dependency = initDependency()
    var installation = initInstallation()

    function initDependency () {
      var path = $path.join(appHome, '@dependency.es')
      var data = loader.load(path)
      var obj = data ? $.eval(data) : Object.create(null)
      if (typeof obj.references !== 'object' || obj.references === null) {
        obj.references = Object.create(null)
      }
      if (typeof obj.packages !== 'object' || obj.packages === null) {
        obj.packages = Object.create(null)
      }
      return obj
    }

    function initInstallation () {
      var path = $path.join(appHome, '@installation.es')
      var data = loader.load(path)
      return data ? $.eval(data) : Object.create(null)
    }

    function findSourcePackage (srcModule) {
      for (var uri in Object.keys(installation)) {
        var path = installation[uri]
        if (srcModule.startsWith(path)) {
          return uri
        }
      }
      return null
    }

    function findTargetPackage (srcPackageUri, refName) {
      var pkgDependency = srcPackageUri ? dependency.packages[srcPackageUri] : null
      return (pkgDependency && pkgDependency[srcPackageUri]) ||
        dependency.references[refName]
    }

    function findPackageRoot (targetPackageUri) {
      return targetPackageUri && installation[targetPackageUri]
    }

    packages.findSourcePackage = findSourcePackage

    packages.resolveReference = function resolve (srcModuleDir, refName) {
      var srcPackageUri = findSourcePackage(srcModuleDir)
      var targetPackageUri = findTargetPackage(srcPackageUri, refName)
      var packageRoot = findPackageRoot(targetPackageUri) ||
        $path.join('packages', refName)

      return $path.resolve(appHome, packageRoot)
    }

    return packages
  }

  return $package
}
