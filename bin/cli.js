#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const package = require("../package.json");
const templates = require('./templates.js')
const downloadGitRepo = require('download-git-repo') 

program
  .command('create')
  .description('创建项目')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入项目名称：'
      },
      {
        type: 'list',
        name: 'template',
        message: '请选择模板类型：',
        choices: templates
      }
    ]).then((answers) => {
      const { name, template } = answers
      downloadGitRepo(template+'#main', path.join(process.cwd(), name), (err) => {
        if (err) {
          console.log('创建失败', err)
        } else {
          console.log('创建模版成功')
          console.log('cd ' + name)
          console.log('npm install')
          console.log('npm run dev')
        }
      })
    })
  });

// 定义当前版本
program.version(`v${package.version}`);
program.parse(process.argv);