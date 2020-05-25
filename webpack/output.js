const fs = require('fs')
const glob = require('glob')
const CSSs = glob.sync('./dist/assets/css/**.css')
CSSs.forEach(path => {
  console.log(path)
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err
    const result = data.replace(/assets\//g, '../')
    fs.writeFile(path, result, 'utf8', err => {
      if (err) throw err
      console.log('路徑修改完成！')
    })
  })
})
