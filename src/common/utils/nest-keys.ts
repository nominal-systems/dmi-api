export function nestKeys (obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const output: any = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const parts = key.split('.')
      let temp = output

      for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          temp[parts[i]] = nestKeys(obj[key]) // recurse for nested objects
        } else {
          temp[parts[i]] = temp[parts[i]] || {}
          temp = temp[parts[i]]
        }
      }
    }
  }

  return output
}
