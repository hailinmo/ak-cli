const cli = require('./args')
const download = require('download-git-repo')

// 根据用户输入的参数，获取对应的项目模板
const reactTmp = 'hailinmo/wp-react-ts#main'
const vueTmp = 'hailinmo/vite-vue3-ts#main'

function createTemplate() {
  cli().then((args) => {
    const address = args.framework === 'vue' ? vueTmp : reactTmp
    download(address, `./${args.name || 'ak-template'}`, function (err) {
      console.log(err ? err : 'success')
    })
  })
}

module.exports = createTemplate
