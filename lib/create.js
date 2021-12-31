'use strict'
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const { run } = require('../utils/executeCommand')
 
module.exports = async (name, options) => {
  const { preset, pkgManager } = await inquirer.prompt([
    {
        name: 'preset',
        type: 'list',
        message: `选择你要创建的项目类型:`,
        choices: [
            {
                name: 'element-plus PC项目',
                value: 'pc'
            },
            {
                name: '移动端h5项目',
                value: 'h5'
            }
        ]
    },{
      name: 'pkgManager',
      type: 'list',
      message: `选择你使用的包管理器:`,
      choices: [
          {
              name: 'npm',
              value: 'npm'
          },
          {
              name: 'yarn',
              value: 'yarn'
          }
      ]
    }
  ])
  if (!preset) {
      return
  } else{
    fs.ensureDir(path.dirname(name));
    fs.copy(path.join(__dirname, `../packages/cli-plugin-${preset}`), path.join(process.cwd(), name), async function(err){
      if(err) return console.log(err);
      console.log(`项目地址：${path.join(process.cwd(), name)}`);

      await run(name, preset, pkgManager);

      console.log(`
      cd ${name}
      ${pkgManager} ${pkgManager==='npm'?'run ':' '}${preset==='sys'?'dev':'serve'}`);
      process.exit();
    })
  }
}