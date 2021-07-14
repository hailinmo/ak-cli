#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2))

const eslintConfig = require('./src/eslint')
const createTemplate = require('./src/template')

const commands = {
  eslint: eslintConfig,
  template: createTemplate,
}

if (argv.eslint) {
  eslintConfig()
}

if (argv.template) {
  createTemplate()
}
