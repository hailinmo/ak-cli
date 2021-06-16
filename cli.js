#!/usr/bin/env node
const inquirer = require('inquirer')

const promptList = [
  {
    type: 'input',
    message: '设置项目名称:',
    name: 'name',
    default: 'ak-template', // 默认值
  },
  {
    type: 'checkbox',
    message: '选择插件:',
    name: 'color',
    choices: ['typescript', 'eslint', 'babel', 'prettier'],
    pageSize: 4, // 设置行数
  },
]

module.exports = function () {
  return inquirer.prompt(promptList)
}
