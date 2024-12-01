const core = require('@actions/core');
const github = require('@actions/github');
const { constantCase } = require('change-case');

// 深度遍历对象
// callback 的参数为 path(key 路径) 和 value
function deepForEach(obj, callback, path = []) {
  for (const key in obj) {
    const value = obj[key];
    callback([...path, key], value);
    if (typeof value === 'object') {
      deepForEach(value, callback, [...path, key]);
    }
  }
}

try {
  const json = core.getInput('json');
  const obj = JSON.parse(json);

  deepForEach(obj, (path, value) => {
    // 将path的每一项转换成constantCase然后join('__')
    const key = path.map(constantCase).join('__');
    core.exportVariable(key, value);
  })
} catch (error) {
  core.setFailed(error.message);
}
