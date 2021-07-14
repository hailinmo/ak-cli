const inquirer = require('inquirer')

const promptList = [
  {
    type: 'input',
    message: '设置项目名称:',
    name: 'name',
    default: 'ak-template', // 默认值
  },
  {
    type: 'list',
    message: '选择框架:',
    name: 'framework',
    choices: ['react', 'vue'],
    pageSize: 2, // 设置行数
  },
  {
    type: 'checkbox',
    message: '选择插件:',
    name: 'eslint',
    choices: ['typescript', 'eslint', 'babel', 'prettier'],
    pageSize: 4, // 设置行数
  },
]

module.exports = function () {
  return inquirer.prompt(promptList)
}
