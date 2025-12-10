// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addSearchParams(url: URL, queryObject: Record<string, any>) {
  Object.keys(queryObject).forEach((key) => {
    const value = queryObject[key]
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((value) => {
          url.searchParams.append(key, value)
        })
      } else {
        url.searchParams.append(key, value)
      }
    }
  })
}
