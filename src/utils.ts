import { format, differenceInMonths, differenceInYears } from 'date-fns'

export const formatDateRange = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const formattedStartDate = format(start, 'MMM yyyy')
  const formattedEndDate = endDate ? format(end, 'MMM yyyy') : 'Present'

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
export const getImageURL = (name: string) => {
  return new URL(`./assets/${name}`, import.meta.url).href
}
