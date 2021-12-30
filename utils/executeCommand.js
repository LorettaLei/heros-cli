const { exec } = require('child_process');
const { getPCPkgs, getH5Pkgs } = require('../config');

exports.run = async (name, preset, pkgManager) => {
    console.log('install start... ' + name + ' ' + preset + ' ' + pkgManager);

    const pkgs = getPkg(preset);

    // await exec(`cd ${name}`);

    const pkgexec = pkgManager === 'yarn' ? 'yarn add' : 'npm install';

    Object.keys(pkgs.dependencies).forEach(async ele => {
        console.log(`${pkgexec} ${ele}`);
        await exec(`${pkgexec} ${ele}`, {
            cwd: `/${name}`
        });
    })

    Object.keys(pkgs.devDependencies).forEach(async ele => {
        console.log(`${pkgexec} -D ${ele}`);
        await exec(`${pkgexec} -D ${ele}`, {
            cwd: name
        });
    })

    // await exec(`cd ..`);
    
    console.log('install end... ');
    return
}

function getPkg(preset){
    return preset === 'h5' ? getH5Pkgs() : getPCPkgs();
}