function findEnv() {
	return `${findSite()}/.env`
}

function findInParent({
	fileOrDir = '',
	parent = '..',
}) {
	const fs = require('fs')
	const search = fs.readdirSync(parent)
	return search.includes(fileOrDir)
}

function findSite(path = '..') {
	if (findInParent({
		fileOrDir: 'site',
		parent: path,
	})) {
		return `${path}/site`
	} else {
		if (findInParent({
			fileOrDir: 'etc',
			parent: `../${path}`,
		})) throw new Error('Reached root /')
		return findSite(`../${path}`)
	}
}

module.exports = findEnv
