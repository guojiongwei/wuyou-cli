const program = require('commander')
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./Generator.js')

module.exports = async function(name, options) {
    const cwd = process.cwd()
    const targetAir = path.join(cwd, name)
    if(fs.existsSync(targetAir)) {
        if(options.force) {
            await fs.remove(targetAir)
        } else {
            console.log('询问用户是否覆盖')
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action:',
                    choices: [
                        {
                            name: 'Overwrite',
                            value: true
                        },
                        {
                            name: 'Cancel',
                            value: false
                        }
                    ]
                }
            ])
            console.log(action)
            if(action) {
                await fs.removeSync(targetAir)
            }
        }
    }
    
    // await fs.mkdir(targetAir)
    const generator = new Generator(name, targetAir)
    generator.create()
}