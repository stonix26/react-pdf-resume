import { isValid, parseISO } from 'date-fns'

export const dateRegex =
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

export function isValidDate(date: string) {
  try {
    const parsedDate = parseISO(date)
    return isValid(parsedDate)
  } catch {
    return false
  }
}
