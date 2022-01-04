const { execSync } = require('child_process');
// const { getPCPkgs, getH5Pkgs } = require('../config');
const path = require('path')
const ora = require('ora')

exports.run = async (name, preset, pkgManager) => {
    const spinner = ora('Loading start').start();
    spinner.color = 'yellow'
    // const pkgs = getPkg(preset);

    const pkgexec = pkgManager === 'yarn' ? 'yarn' : 'npm install';
    spinner.start();
    // Object.keys(pkgs.dependencies).forEach(async ele => {
    //     await execSync(`${pkgexec} ${ele}@${pkgs.dependencies[ele]}`, {
    //         cwd: path.join(process.cwd(), name)
    //     });
    // })

    // Object.keys(pkgs.devDependencies).forEach(async ele => {
    //     await execSync(`${pkgexec} -D ${ele}@${pkgs.devDependencies[ele]}`, {
    //         cwd: path.join(process.cwd(), name)
    //     });
    // })
    await execSync(`${pkgexec}`, {
        cwd: path.join(process.cwd(), name)
    });

    spinner.stop();
    
    return
}

// function getPkg(preset){
//     return preset === 'h5' ? getH5Pkgs() : getPCPkgs();
// }