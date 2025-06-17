export function errorHandler(error: unknown): { errors: string[]} {
  console.log('出错啦：' + error)
  
  if (error instanceof Error) {
    return{ errors: [error.message] }
  } else {
    return{ errors: ['Something went wrong'] }
  }
}