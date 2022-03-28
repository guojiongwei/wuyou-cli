// lib/Generator.js
const ora = require('ora')
const util = require('util')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const downloadGitRepo = require('download-git-repo')
const { getRepoList, getTagList } = require('./http')

async function wrapLoading(fn, message, ...args) {
    const spinner = ora(message)
    spinner.start()
    try {
        const result = await fn(...args)
        spinner.succeed()
        return result
    } catch (error) {
        spinner.fail('Request failed, refetch ...')
    }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  async getRepo() {
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template')
    if(!repoList) return
    const repos = repoList.map(item => item.name)
    const { repo } = await inquirer.prompt({
        name: 'repo',
        type: 'list',
        choices: repos,
        message: 'Please choose a template to create project'
    })
    return repo
  }

  // 核心创建逻辑
  async create() {
      const repo = await this.getRepo()
      const tag = await this.getTag(repo)
      console.log('用户选择了，repo=' + repo + '，tag='+ tag)
      await this.download(repo, tag)
      console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
      console.log('  npm run dev\r\n')
  }

  async getTag(repo) {
      const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
      if(!tags) return

      const tagsList = tags.map(item => item.name)
      const { tag } = await inquirer.prompt({
        name: 'tag',
        type: 'list',
        choices: tagsList,
        message: 'Place choose a tag to create project'
      })
      return tag
  }

  async download(repo, tag) {
      const requestUrl = `zhurong-cli/${repo}${tag?'#'+tag:''}`;
      await wrapLoading(
        this.downloadGitRepo,
        'waiting download template',
        requestUrl,
        path.resolve(process.cwd(), this.targetDir)
    )
  }
}

module.exports = Generator;
