import {
  format,
  differenceInMonths,
  differenceInYears
} from 'date-fns'
import { fileSchema } from '@/schema'

function formatUnit(value: number, unit: 'yr' | 'mo') {
  return value > 0 ? `${value} ${unit}${value > 1 ? 's' : ''}` : ''
}

export function formatDateRange(startDate: string, endDate?: string) {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const formattedStartDate = format(start, 'MMM d, yyyy')
  const formattedEndDate = endDate ? format(end, 'MMM d, yyyy') : 'Present'

  const totalYears = differenceInYears(end, start)
  const totalMonths = differenceInMonths(end, start) % 12

  const timeDifference = [formatUnit(totalYears, 'yr'), formatUnit(totalMonths, 'mo')]
    .filter(Boolean)
    .join(' ')

  return { formattedStartDate, formattedEndDate, timeDifference }
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

export async function serializeFileField(
  value: File | string | undefined
): Promise<string | undefined> {
  if (!value) return undefined
  if (typeof value === 'string') return value

  const parsed = fileSchema.safeParse(value)
  if (!parsed.success) return undefined

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(value)
  })
}
