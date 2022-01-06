const { exec } = require('child_process');
const path = require('path')
const ora = require('ora')

exports.run = async (name, preset, pkgManager) => {
    console.clear()
    const spinner = ora('Loading start').start();
    spinner.color = 'blue'

    const pkgexec = pkgManager === 'yarn' ? 'yarn' : 'npm install';

    spinner.start();

    process.on('SIGINT', function () {
        console.log(`
        安装进程中断
        执行以下命令完成安装并启动项目:
        `);
        console.log(`
        cd ${name}
        ${pkgManager}${pkgManager==='npm'?' install':''}
        ${pkgManager} ${pkgManager==='npm'?'run ':''}${preset==='pc'?'dev':'serve'}`);
        process.exit();
    });

    exec(`${pkgexec}`, {
        cwd: path.join(process.cwd(), name)
    }, function(error, stdout, stderr){
        if(error){
            console.log(error)
        }
        spinner.stop();

        console.log(`
        cd ${name}
        ${pkgManager} ${pkgManager==='npm'?'run ':''}${preset==='pc'?'dev':'serve'}`);
        
        process.exit();
    })

}
