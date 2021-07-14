const inquirer = require('inquirer')

const promptList = [
  {
    type: 'list',
    message: '选择框架:',
    name: 'framework',
    choices: ['react', 'vue'],
    pageSize: 2, // 设置行数
  },
  {
    type: 'checkbox',
    message: '是否要支持ts:',
    name: 'eslint',
    choices: ['typescript'],
    pageSize: 4, // 设置行数
  },
]

module.exports = function () {
  return inquirer.prompt(promptList)
}
