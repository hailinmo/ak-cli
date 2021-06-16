#!/usr/bin/env node
const cli = require('./cli')
const download = require('download-git-repo')

// 根据用户输入的参数，获取对应的项目模板

const address = 'hailinmo/react-webpack'

cli().then((args) => {
  console.log(args)
  download(address, `./${args.name}`, function (err) {
    console.log(err ? err : 'success')
  })
})
