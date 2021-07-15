const fs = require('fs/promises')
async function writeContent(file, content) {
  try {
    await fs.writeFile(file, content)
    return true
  } catch (err) {
    console.log(err)
  }
}

async function readContent(file, config) {
  try {
    const data = await fs.readFile(file, config)
    return data
  } catch (err) {
    console.log(err)
  }
}

module.exports = { writeContent, readContent }
