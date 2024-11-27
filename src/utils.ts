import {
  format,
  differenceInMonths,
  differenceInYears,
  parseISO,
  isValid
} from 'date-fns'

export function formatDateRange(startDate: string, endDate?: string) {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const formattedStartDate = format(start, 'MMM d, yyyy')
  const formattedEndDate = endDate ? format(end, 'MMM d, yyyy') : 'Present'

  const totalYears = differenceInYears(end, start)
  const totalMonths = differenceInMonths(end, start) % 12

  const timeDifference = [
    totalYears > 0 ? `${totalYears} yr${totalYears > 1 ? 's' : ''}` : '',
    totalMonths > 0 ? `${totalMonths} mo${totalMonths > 1 ? 's' : ''}` : ''
  ]
    .filter(Boolean)
    .join(' ')

  return { formattedStartDate, formattedEndDate, timeDifference }
}

// Get asset images
export function getImageURL(name: string) {
  return new URL(`./assets/${name}`, import.meta.url).href
}

export function sortStringsAlphabetically(arr: (string | undefined)[]) {
  return arr.sort((a, b) => {
    // Handle if 'a' or 'b' is undefined
    if (a === undefined) return 1 // Move undefined to the end
    if (b === undefined) return -1 // Move undefined to the end

    // Compare alphabetically, case-insensitive
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })
}

// Date validation
export const isValidDate = (date: string) => {
  try {
    const parsedDate = parseISO(date) // Parses a string in ISO format
    return isValid(parsedDate) // Validates if the parsed date is valid
  } catch {
    return false
  }
}
