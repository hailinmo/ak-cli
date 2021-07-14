#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const cli = require('./args')

const {
  eslintJson,
  commonEslintPlugins,
  tsPlugins,
  vuePlugins,
  reactPlugins,
  babelPlugins,
} = require('./constants')

function eslintConfig() {
  cli().then((args) => {
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

    //写入文件
    var eslintFile = path.join(process.cwd(), '.eslintrc.json')
    fs.writeFile(eslintFile, jsonStr, function (err) {
      if (err) {
        return console.log(err)
      }
      console.log('eslint配置文件创建成功')
    })

    //读取文件
    var packageFile = path.join(process.cwd(), 'package.json')
    fs.readFile(packageFile, 'utf-8', function (err, data) {
      if (err) {
        return console.log(err)
      }
      const packageData = JSON.parse(data)
      if (!packageData.devDependencies) {
        packageData.devDependencies = {}
      }
      packageData.devDependencies = {
        ...packageData.devDependencies,
        ...(isBabel ? babelPlugins : {}),
        ...(isTs ? tsPlugins : {}),
        ...commonEslintPlugins,
        ...(isVue ? vuePlugins : {}),
        ...(isReact ? reactPlugins : {}),
      }

      const packageStr = JSON.stringify(packageData, null, '\t')
      fs.writeFile(packageFile, packageStr, function (err) {
        if (err) {
          return console.log(err)
        }
        console.log('eslint依赖添加成功')
      })
    })
  })
}

module.exports = eslintConfig
