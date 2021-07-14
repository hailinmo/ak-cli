const cli = require('./args')
const download = require('download-git-repo')

// 根据用户输入的参数，获取对应的项目模板
const address = 'hailinmo/react-webpack#main'

function createTemplate() {
  cli().then((args) => {
    download(address, `./${args.name || 'ak-template'}`, function (err) {
      console.log(err ? err : 'success')
    })
  })
}

module.exports = createTemplate
