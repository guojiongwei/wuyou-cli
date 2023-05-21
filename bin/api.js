// bin/api.js
const https = require('https')

/** 获取用户git仓库列表信息 */
function getGitReposList(username) {
  return new Promise((resolve, reject) => {
    https.request(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'User-Agent': username
      }
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk.toString()
      })
      res.on('end', () => {
        const list = JSON.parse(data)
        resolve(list.map(item => ({ // 组合成模版所需要的name，value结构
          name: item.name,
          value: `https://github.com:${username}/${item.name}`
        })))
      })
      res.on('error', (err) => {
        reject(err)
      })
    }).end()
  })
}

module.exports = {
  getGitReposList
}