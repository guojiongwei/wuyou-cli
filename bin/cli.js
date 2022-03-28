#! /usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const figlet = require('figlet')

program.
    command('create <app-name>')
    .description('create a new project')
    .option('-f, --force', 'overwrite target directory if it exist')
    .action(require('../lib/create.js'))

program
    .version(`v${require('../package.json').version}`)
    .usage('<commmand> [option]')

// 配置帮助命令
program.on('--help', () => {
    console.log('\r\n' + chalk.green(figlet.textSync('wuyou', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })));
    console.log(`\r\nRun ${chalk.cyan(`wuyou <command> --help`)} for detailed usage of given command\r\n`)
})

program.parse(process.argv)
