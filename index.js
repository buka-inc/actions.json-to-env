const core = require('@actions/core')
const { constantCase } = require('change-case')

// 深度遍历对象
function deepForEach(obj, callback, path = []) {
  for (const key in obj) {
    const value = obj[key]

    if (typeof value === 'object' && value !== null) {
      deepForEach(value, callback, [...path, key])
    } else {
      callback([...path, key], value)
    }
  }
}

try {
  const json = core.getInput('json')
  const obj = JSON.parse(json)

  deepForEach(obj, (path, value) => {
    const key = path.map(constantCase).join('__')
    core.exportVariable(key, value)
  })
} catch (error) {
  core.setFailed(error.message)
}
