export function nestKeys (obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const output: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) === true) {
      const parts = key.split('.')
      let temp: Record<string, any> | any = output

      for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          temp[parts[i]] = nestKeys(obj[key]) // recurse for nested objects
        } else {
          if (typeof temp[parts[i]] !== 'object' || temp[parts[i]] === null) {
            temp[parts[i]] = {}
          }
          temp = temp[parts[i]]
        }
      }
    }
  }

  return output
}
