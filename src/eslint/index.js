#!/usr/bin/env node

const path = require('path')
const cli = require('./args')
const { writeContent, readContent } = require('../utils/index')

const {
  eslintJson,
  commonEslintPlugins,
  tsPlugins,
  vuePlugins,
  reactPlugins,
  babelPlugins,
} = require('./constants')

function eslintConfig() {
  cli().then(async (args) => {
    const isTs = args.eslint.includes('typescript')
    const isVue = args.framework === 'vue'
    const isReact = args.framework === 'react'
    const isBabel = isVue && isTs ? false : true

    eslintJson.parser = isVue
      ? 'vue-eslint-parser'
      : isTs
      ? '@typescript-eslint/parser'
      : '@babel/eslint-parser'

    eslintJson.parserOptions.parser =
      isVue && isTs ? '@typescript-eslint/parser' : '@babel/eslint-parser'

    if (isReact) {
      eslintJson.plugins.push('react')
      eslintJson.extends.splice(-1, 0, 'plugin:react/recommended')
    }
    if (isVue) {
      eslintJson.plugins.push('vue')
      eslintJson.extends.splice(-1, 0, 'plugin:vue/vue3-recommended')
    }
    if (isTs) {
      eslintJson.extends.splice(-1, 0, 'plugin:@typescript-eslint/recommended')
      eslintJson.plugins.push('@typescript-eslint')
    }

    const jsonStr = JSON.stringify(eslintJson, null, '\t')

    //写入eslint配置文件
    var eslintFile = path.join(process.cwd(), '.eslintrc.json')
    await writeContent(eslintFile, jsonStr)

    //读取package文件
    var packageFile = path.join(process.cwd(), 'package.json')
    const data = await readContent(packageFile, 'utf-8')
    const packageData = JSON.parse(data)

    packageDev = {
      ...(packageData.devDependencies || {}),
      ...(isBabel ? babelPlugins : {}),
      ...(isTs ? tsPlugins : {}),
      ...commonEslintPlugins,
      ...(isVue ? vuePlugins : {}),
      ...(isReact ? reactPlugins : {}),
    }

    packageData.devDependencies = {}

    Object.keys(packageDev)
      .sort()
      .map((key) => {
        packageData.devDependencies[key] = packageDev[key]
      })

    const packageStr = JSON.stringify(packageData, null, '\t')
    await writeContent(packageFile, packageStr)
  })
}

module.exports = eslintConfig
