export function errorHandler(error: unknown): { errors: string[]} {
  if (error instanceof Error) {
    return{ errors: [error.message] }
  } else {
    return{ errors: ['Something went wrong'] }
  }
}