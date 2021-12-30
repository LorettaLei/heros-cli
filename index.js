#!/usr/bin/env node

const commander = require('commander');

commander
    .version(require('./package.json').version)
    .option('-v,--version','查看版本号');

commander
    .command('create <app-name>')
    .description('使用 heros-cli 创建一个项目')
    .action(function (name, options) {
        require('./lib/create')(name, options)
    });

commander.parse(process.argv);