import { format, differenceInMonths, differenceInYears } from 'date-fns'

/**
 * Formats a date range and calculates the time difference in years and months.
 * If endDate is undefined, it will display 'Present' instead of the end date.
 *
 * @param {string} startDate - The start date in ISO format (e.g., '2018-02-01').
 * @param {string | undefined} endDate - The end date in ISO format or undefined.
 * @returns {string} - The formatted date range and difference (e.g., 'Feb 2018 - May 2019 · 1 yr 3 mos').
 */
export const formatDateRange = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date() // Use current date if endDate is undefined

  // Format the start and end dates to "MMM yyyy"
  const formattedStartDate = format(start, 'MMM yyyy')
  const formattedEndDate = endDate ? format(end, 'MMM yyyy') : 'Present'

  // Calculate the total years and months between start and end
  const totalYears = differenceInYears(end, start)
  const totalMonths = differenceInMonths(end, start) % 12

  // Construct the time difference string (e.g., "1 yr 3 mos")
  const timeDifference = [
    totalYears > 0 ? `${totalYears} yr${totalYears > 1 ? 's' : ''}` : '',
    totalMonths > 0 ? `${totalMonths} mo${totalMonths > 1 ? 's' : ''}` : ''
  ]
    .filter(Boolean) // Filter out empty strings
    .join(' ') // Join with a space

  return { formattedStartDate, formattedEndDate, timeDifference }
}

// Get asset images
export const getImageURL = (name: string) => {
  return new URL(`./assets/${name}`, import.meta.url).href
}
