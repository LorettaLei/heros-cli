'use strict'
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const { run } = require('../utils/executeCommand')
 
module.exports = async (name, options) => {
  const { preset, pkgManager } = await inquirer.prompt([
    {
      name: 'author',
      type: 'input',
      message: `请输入你的名字:`
    },{
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
    download(`github:LorettaLei/heros-cli-ui${ preset === 'h5' ? '#h5' : '#main' }`, path.join(process.cwd(), name), { clone: true }, function (err) {
      if(err){
        console.log(err)
      }else{

        // fs.copy(path.join(__dirname, `../packages/cli-plugin-${preset}`), path.join(process.cwd(), name), async function(err){
        //   if(err) return console.log(err);

        //   console.log(`项目地址：${path.join(process.cwd(), name)}`);

          let pkg = getPackageJson(path.join(process.cwd(), name));
          pkg.name = name;
          pkg.author = author;
          
          try{
            await fs.writeFileSync(path.join(process.cwd(), `./${name}/package.json`), JSON.stringify(pkg, null, 4));
          }catch(err){
            console.log(err)
          }

          run(name, preset, pkgManager);

        // })

      }
     
    })
  }
}

function getPackageJson (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')

  let packageJson
  try {
    packageJson = fs.readFileSync(packagePath, 'utf-8')
  } catch (err) {
    throw new Error(`The package.json file at '${packagePath}' does not exist`)
  }

  try {
    packageJson = JSON.parse(packageJson)
  } catch (err) {
    throw new Error('The package.json is malformed')
  }

  return packageJson
}