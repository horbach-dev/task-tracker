const data = {
  user: {
    name: 'Alice',
    age: null,
    info: {
      email: null,
      city: 'Minsk'
    }
  },
  settings: {
    theme: null
  },
  debug: null
}

function findNullPaths (obj) {
  const result = []

  const stack = [{ data: obj, path: '' }]

  while (stack.length) {
    const { data, path } = stack.pop()

    if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach(key => {
        stack.push({ data: data[key], path: path ? `${path}.${key}` : key })
      })
    }

    if (data === null) {
      result.push(path)
    }

  }

  return result
}

console.log(findNullPaths(data))