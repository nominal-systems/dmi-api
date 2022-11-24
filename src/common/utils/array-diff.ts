function diff<T> (a: T[], b: T[]): T[] {
  return a.filter((element) => {
    return !b.includes(element)
  })
}

export function arrayDiff<T> (a: T[], b: T[]): T[] {
  return [
    ...diff(a, b),
    ...diff(b, a)
  ]
}
