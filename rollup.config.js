import path from 'path'

function buildJS(input) {
  const parsed = path.parse(input)
  return {
    input: `${input}`,
    output: {
      file: `dist/${parsed.name}.js`,
      format: 'cjs',
    },
    external: ['fs'],
  }
}

export default [buildJS('index.js')]
