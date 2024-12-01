# actions.json-to-env

Converts a JSON string to environment variables.
And all key will be transform to CONSTANT_CASE by [change-case](https://www.npmjs.com/package/change-case).

## Inputs

| **Argument** | **Required** | **Default** | **Description**                                        |
| :----------- | :----------- | :---------- | :----------------------------------------------------- |
| json         | true         | -           | The JSON string                                        |
| prefix       | false        | `''`        | The prefix of environment variable                     |
| separator    | false        | `'__'`      | The separator to use between the parent and child keys |

## Examples

```yaml
name: Example

on: push

jobs:
  test:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./
        with:
          json: '{"pkg_a": {"version": "1.1.1"}, "pkgB": {"version": "9.9.9"}}'
          prefix: "root"
      - run: |
          [[ $ROOT__PKG_A__VERSION == "1.1.1" ]] || exit 1
          [[ $ROOT__PKG_B__VERSION == "9.9.9" ]] || exit 1
```
